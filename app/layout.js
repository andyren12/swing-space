"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <SessionProvider>
            <Navbar />
            {children}
          </SessionProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
