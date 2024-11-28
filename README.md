# The Villa Hotel Management System

This is a Next.js project that uses Prisma ORM for database management. It supports both Node.js (v21 or higher) and Bun as runtimes. Follow the instructions below to set up and start the project.

---

## Getting Started

### Dependencies
- _Node.js_
- _Bun (optional)_
- _Package Manager (npm or yarn)_
- _Next.js 14.2.5_
- _React 18_
- _TypeScript_
- _Tailwind CSS_
- _Prisma ORM_
- _Auth.js (AKA NextAuth.js)_
- _Prisma Accelerate_
- _Edgestore_
- _Three.js + React Three Fiber + React Three Drei_
- _Vitest + Jest + Testing Library_
- _ESLint + Prettier_
- _Nodemailer_
- _React Hook Form_
- _Zod_
- _Framer Motion_
- _Redux_
- _Payhere (SandBox)_

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Node.js](https://nodejs.org/) (v21 or higher)
- **Bun (optional)**: [Bun](https://bun.sh/) (for faster runtime and package management)
- **Package Manager**:
  - If using Node.js: [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
  - If using Bun: Bun includes a built-in package manager.

---

### Installation

1. **Clone the Repository**  
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/kavindu-mane/The-Villa-Hotel.git
   cd the-villa-hotel
   ```
2. **Install Dependencies**
    - If using npm:
      ```bash
      npm install
      ```
    - If using yarn:
      ```bash
      yarn install
      ```
    - If using Bun:
      ```bash
      bun install
      ```
3. **Set Up Environment Variables**
    * Method 1:
      - Create a `.env` file in the root directory of the project.
      - Copy the contents of the `.env.example` file and paste them into the `.env` file.
    * Method 2:
       - Use the following command to create the `.env` file:
         ```bash
         cp .env.example .env
         ```

    - Add the required environment variables to the `.env` file.
4. **Set Up Database**
    - Run the following command to create the database schema:
        - If using npm:
          ```bash
          npx prisma generate --no-engine
          npx prisma db push
          ```
        - If using yarn:
          ```bash
          npx prisma generate --no-engine
          npx prisma db push
          ```
        - If using Bun:
          ```bash
          bunx prisma generate --no-engine
          bunx prisma db push
          ```
5. **Start the Development Server**
    - If using npm:
      ```bash
      npm run dev
      ```
    - If using yarn:
      ```bash
      yarn dev
      ```
    - If using Bun:
      ```bash
      bun dev
      ```
6. **Open the Project in Your Browser**
    - Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
7. **Access the Database**
    - If using npm:
      ```bash
      npx prisma studio
      ```
    - If using yarn:
      ```bash
      npx prisma studio
      ```
    - If using Bun:
      ```bash
      bunx prisma studio
      ```
    - Open [http://localhost:5555](http://localhost:5555) with your browser to access the Prisma Studio.
    - Use the Prisma Studio to view and manage the database.
8. **Build the Project**
    - If using npm:
      ```bash
      npm run build
      ```
    - If using yarn:
      ```bash
      yarn build
      ```
    - If using Bun:
      ```bash
      bun build
      ```
9.  **Start the Production Server**
    - If using npm:
      ```bash
      npm start
      ```
    - If using yarn:
      ```bash
      yarn start
      ```
    - If using Bun:
      ```bash
      bun start
      ```

---

## Collaborators

<a href="https://github.com/kavindu-mane/the-villa-hotel/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kavindu-mane/the-villa-hotel" />
</a>

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

This version includes support for both Node.js v21 and Bun, and provides clear instructions for both runtimes. Let me know if further tweaks are needed!

---

 
