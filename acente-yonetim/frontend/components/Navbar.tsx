"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>Acente Yönetim</div>
      <div className={styles.links}>
        <Link
          href="/hotels"
          className={path.startsWith("/hotels") ? styles.active : styles.link}
        >
          Oteller
        </Link>
        <Link
          href="/guests"
          className={path.startsWith("/guests") ? styles.active : styles.link}
        >
          Misafirler
        </Link>
      </div>
    </nav>
  );
}
