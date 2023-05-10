"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const { push } = useRouter();
  return (
    <main className={styles.main}>
      <button
        onClick={() => {
          push("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          push("/signup");
        }}
      >
        Sign up
      </button>
    </main>
  );
}
