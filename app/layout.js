"use client";
import "./globals.css";
import Navbar from "./Navbar";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
