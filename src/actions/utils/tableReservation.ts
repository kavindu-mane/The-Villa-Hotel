"use server"

import { z } from 'zod';
import {
    RestaurantAvailabilitySchema,
    RestaurantReservationSchema,
    RestaurantMenuSchema,
    RestaurantRemarkSchema
} from '@/validations';
import { db } from "@/lib/db";
import { Status } from "@prisma/client";

export async function checkRestaurantAvailability(date: Date, time_slot: string) {
    try {
        // Validate the input
        const parsedData = RestaurantAvailabilitySchema.parse({ date: new Date(date), time_slot });

        // Return success response if validation passes
        return { success: true, data: parsedData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return validation errors
            return { success: false, message: 'Validation error', errors: error.errors };
        } else {
            // Handle other errors
            return { success: false, message: 'Internal server error' };
        }
    }
}

// Function to check table availability based on date and time slot
export async function getAvailableTables(date: Date, time_slot: string) {
    try {
        // Validate the input
        const parsedData = RestaurantAvailabilitySchema.parse({ date: new Date(date), time_slot });

        // Fetch all tables
        const allTables = await db.tables.findMany();

        // Fetch reserved tables for the given date and time slot
        const reservedTables = await db.tableReservation.findMany({
            where: {
                date: parsedData.date,
                timeSlot: parsedData.time_slot,
            },
            select: {
                tableId: true,
            },
        });

        const reservedTableIds = reservedTables.map(reservation => reservation.tableId);

        // Filter available tables
        const availableTables = allTables.map(table => ({
            ...table,
            isAvailable: !reservedTableIds.includes(table.id),
        }));

        return { success: true, data: availableTables };
    } catch (error) {
        console.error("Error fetching available tables:", error);
        return { success: false, message: 'Internal server error' };
    }
}

// Function to fetch table ID by tableId
export async function getTableIdByTableId(tableId: string) {
    try {
        const table = await db.tables.findUnique({
            where: { tableId },
        });

        if (!table) {
            return { success: false, message: 'Table not found' };
        }

        return { success: true, data: { id: table.id } };
    } catch (error) {
        console.error("Error fetching table ID:", error);
        return { success: false, message: 'Internal server error' };
    }
}

//function for tablereservation
export async function reserveRestaurantTable(data: {
    tableId: string;
    name: string;
    email: string;
    phone: string;
}) {
    try {
        // Validate the input
        const parsedData = RestaurantReservationSchema.parse(data);

        // Return success response if validation passes
        return { success: true, data: parsedData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return validation errors
            return { success: false, message: 'Validation error', errors: error.errors };
        } else {
            // Handle other errors
            return { success: false, message: 'Internal server error' };
        }
    }
}


// Combine schemas into a complete validation schema
const CompleteMenuSchema = z.object({
    menu: RestaurantMenuSchema.shape.menu,
    remark: RestaurantRemarkSchema.shape.remark,
});

// Function to fetch menu items from the database
export async function fetchMenuItems() {
    try {
        // Fetch all menu items from the database
        const menuItems = await db.foods.findMany(); // Adjust based on your Prisma model name

        // Return success response with menu items
        return { success: true, data: menuItems };
    } catch (error) {
        console.error("Error fetching menu items:", error);
        // Handle database query errors
        return { success: false, message: 'Internal server error' };
    }
}

// Function to validate menu selection
export async function restaurantMenuSelection(data: z.infer<typeof CompleteMenuSchema>) {
    try {
        // Validate the input data using the complete schema
        const parsedData = CompleteMenuSchema.parse(data);

        // Return success response if validation passes
        return { success: true, data: parsedData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Return validation errors
            return { success: false, message: 'Validation error', errors: error.errors };
        } else {
            // Handle other errors
            return { success: false, message: 'Internal server error' };
        }
    }
}

// Function to fetch food item details by IDs from the database
export async function fetchFoodDetailsByIds(ids: string[]) {
    try {
        // Fetch the food items from the database by their IDs
        const foodItems = await db.foods.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        // Return success response with food items
        return { success: true, data: foodItems };
    } catch (error) {
        console.error("Error fetching food items:", error);
        // Handle database query errors
        return { success: false, message: 'Internal server error' };
    }
}

// Reserve Restaurant Table
export async function tableReservation(data: {
    table: string;
    name: string;
    email: string;
    phone: string;
    date: Date;
    time_slot: string;
    selectedMenu: { id: string; quantity: number; price: number }[];
    remark?: string;
    total: number;
}) {
    try {
        // Validate the input
        const parsedData = RestaurantReservationSchema.parse(data);
        console.log("Parsed data:", parsedData);

        // Start a transaction
        const result = await db.$transaction(async (tx) => {
            // Create table reservation first
            const tableReservation = await tx.tableReservation.create({
                data: {
                    tableId: data.table,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    date: new Date(data.date),
                    timeSlot: data.time_slot,
                    total: data.total, // Store the total cost
                    status: 'Confirmed',
                },
            });

            console.log("Created table reservation:", tableReservation);

            // Process each selected menu item
            const foodReservations = await Promise.all(data.selectedMenu.map(async (menuItem) => {
                // Find the food item by ID
                const foodItem = await tx.foods.findUnique({ where: { id: menuItem.id } });
                if (!foodItem) {
                    throw new Error(`Food item with id ${menuItem.id} not found`);
                }

                console.log("Found food item:", foodItem);

                // Create a food reservation
                const foodReservation = await tx.foodReservation.create({
                    data: {
                        foodId: menuItem.id,
                        quantity: menuItem.quantity,
                        price: menuItem.price,
                        specialRequirement: data.remark || '',
                        tableReservation: {
                            connect: { id: tableReservation.id },
                        },
                    },
                });

                console.log("Created food reservation:", foodReservation);

                // Create a food reservation item
                await tx.foodReservationItem.create({
                    data: {
                        foodId: menuItem.id,
                        foodReservationId: foodReservation.id,
                    },
                });

                console.log("Created food reservation item for food item:", menuItem.id);

                return foodReservation;
            }));

            return tableReservation;
        });

        return { success: true, data: result };
    } catch (error) {
        console.error("Error reserving table:", error);
        return { success: false, message: 'Internal server error' };
    }
}
