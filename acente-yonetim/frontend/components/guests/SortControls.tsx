"use client";
import { SortDir, SortField } from "@/lib/api";
import styles from "./Guests.module.css";

const SORT_FIELDS: { value: SortField; label: string }[] = [
  { value: "checkindate", label: "Giriş Tarihi" },
  { value: "checkoutdate", label: "Çıkış Tarihi" },
  { value: "lastname", label: "Soyad" },
];

interface Props {
  sortBy: SortField | "";
  direction: SortDir;
  onSort: (field: SortField, dir: SortDir) => void;
  onClear: () => void;
}

export default function SortControls({ sortBy, direction, onSort, onClear }: Props) {
  return (
    <div className={styles.controlGroup}>
      <span className={styles.controlLabel}>Sırala:</span>
      {SORT_FIELDS.map((f) => {
        const active = sortBy === f.value;
        const nextDir: SortDir = active && direction === "asc" ? "desc" : "asc";
        return (
          <button
            key={f.value}
            id={`sort-${f.value}`}
            className={active ? styles.sortBtnActive : styles.sortBtn}
            onClick={() => onSort(f.value, nextDir)}
          >
            {f.label}
            {active && (
              <span className={styles.sortArrow}>
                {direction === "asc" ? " ↑" : " ↓"}
              </span>
            )}
          </button>
        );
      })}
      {sortBy && (
        <button id="sort-clear" className={styles.clearBtn} onClick={onClear}>
          Temizle
        </button>
      )}
    </div>
  );
}
