"use client";
import { useEffect, useState } from "react";
import { Hotel, HotelInput } from "@/lib/api";
import styles from "./Hotels.module.css";

interface Props {
  hotel?: Hotel | null;
  onSave: (data: HotelInput) => void;
  onCancel: () => void;
}

const EMPTY: HotelInput = {
  hotelName: "",
  hotelAddress: "",
  hotelMailAddress: "",
  hotelPhoneNumber: "",
};

export default function HotelForm({ hotel, onSave, onCancel }: Props) {
  const [form, setForm] = useState<HotelInput>(EMPTY);

  useEffect(() => {
    if (hotel) {
      setForm({
        hotelName: hotel.hotelName,
        hotelAddress: hotel.hotelAddress,
        hotelMailAddress: hotel.hotelMailAddress,
        hotelPhoneNumber: hotel.hotelPhoneNumber,
      });
    } else {
      setForm(EMPTY);
    }
  }, [hotel]);

  function set(field: keyof HotelInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>
          {hotel ? "Oteli Düzenle" : "Yeni Otel Ekle"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Otel Adı
            <input
              id="hotel-name"
              className={styles.input}
              required
              value={form.hotelName}
              onChange={(e) => set("hotelName", e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Adres
            <input
              id="hotel-address"
              className={styles.input}
              required
              value={form.hotelAddress}
              onChange={(e) => set("hotelAddress", e.target.value)}
            />
          </label>
          <label className={styles.label}>
            E-posta
            <input
              id="hotel-email"
              type="email"
              className={styles.input}
              required
              value={form.hotelMailAddress}
              onChange={(e) => set("hotelMailAddress", e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Telefon
            <input
              id="hotel-phone"
              className={styles.input}
              required
              value={form.hotelPhoneNumber}
              onChange={(e) => set("hotelPhoneNumber", e.target.value)}
            />
          </label>
          <div className={styles.formActions}>
            <button type="submit" id="hotel-save" className={styles.btnPrimary}>
              Kaydet
            </button>
            <button
              type="button"
              id="hotel-cancel"
              className={styles.btnSecondary}
              onClick={onCancel}
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
