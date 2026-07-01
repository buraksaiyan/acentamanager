"use client";
import { useState } from "react";
import styles from "./Guests.module.css";

interface Props {
  onFilter: (filters: { voucherNumber?: string; lastName?: string }) => void;
  onClear: () => void;
}

export default function FilterControls({ onFilter, onClear }: Props) {
  const [voucher, setVoucher] = useState("");
  const [lastName, setLastName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const filters: { voucherNumber?: string; lastName?: string } = {};
    if (voucher.trim()) filters.voucherNumber = voucher.trim();
    if (lastName.trim()) filters.lastName = lastName.trim();
    onFilter(filters);
  }

  function handleClear() {
    setVoucher("");
    setLastName("");
    onClear();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.filterForm}>
      <span className={styles.controlLabel}>Filtrele:</span>
      <input
        id="filter-voucher"
        className={styles.filterInput}
        placeholder="Voucher No"
        value={voucher}
        onChange={(e) => setVoucher(e.target.value)}
      />
      <input
        id="filter-lastname"
        className={styles.filterInput}
        placeholder="Soyad"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button id="filter-apply" type="submit" className={styles.sortBtn}>
        Uygula
      </button>
      <button
        id="filter-clear"
        type="button"
        className={styles.clearBtn}
        onClick={handleClear}
      >
        Temizle
      </button>
    </form>
  );
}
