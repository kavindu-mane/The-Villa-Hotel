import { expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { roomsDataTypes } from "@/types";
import roomsSlice, {
  setAllRooms,
  setCurrentRoom,
} from "@/states/admin/rooms-slice";

// Mock data
const mockRooms: roomsDataTypes[] = [
  {
    id: "1",
    number: 101,
    type: "Deluxe",
    price: 200,
    persons: 2,
    beds: {
      data: ["One_Double_Bed"],
    },
    features: {
      data: ["WiFi", "Air Conditioning"],
    },
    images: {
      data: ["image1.jpg", "image2.jpg"],
    },
    images360: "image360.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    number: 102,
    type: "Standard",
    price: 150,
    persons: 2,
    beds: {
      data: ["One_Double_Bed"],
    },
    features: {
      data: ["WiFi"],
    },
    images: {
      data: ["image3.jpg", "image4.jpg"],
    },
    images360: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockRoom: roomsDataTypes = {
  id: "1",
  number: 101,
  type: "Deluxe",
  price: 200,
  persons: 2,
  beds: {
    data: ["Two_Single_Beds"],
  },
  features: {
    data: ["WiFi", "Air Conditioning"],
  },
  images: {
    data: ["image1.jpg", "image2.jpg"],
  },
  images360: "image360.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

test("should handle initial state", () => {
  const store = configureStore({ reducer: { rooms: roomsSlice } });
  const state = store.getState().rooms;
  expect(state).toEqual({
    all: null,
    current: null,
  });
});

test("should handle setAllRooms", () => {
  const store = configureStore({ reducer: { rooms: roomsSlice } });
  store.dispatch(setAllRooms(mockRooms));
  const state = store.getState().rooms;
  expect(state.all).toEqual(mockRooms);
});

test("should handle setCurrentRoom", () => {
  const store = configureStore({ reducer: { rooms: roomsSlice } });
  store.dispatch(setCurrentRoom(mockRoom));
  const state = store.getState().rooms;
  expect(state.current).toEqual(mockRoom);
});
