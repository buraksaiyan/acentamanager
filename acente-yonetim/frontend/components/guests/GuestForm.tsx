"use client";
import { useEffect, useState } from "react";
import { Guest, GuestInput, Hotel } from "@/lib/api";
import styles from "./Guests.module.css";

interface Props {
  guest?: Guest | null;
  hotels: Hotel[];
  onSave: (data: GuestInput) => void;
  onCancel: () => void;
}

function toInput(g: Guest): GuestInput {
  return {
    firstName: g.firstName,
    lastName: g.lastName,
    voucherNumber: g.voucherNumber,
    checkInDate: g.checkInDate,
    checkOutDate: g.checkOutDate,
    phoneNumber: g.phoneNumber,
    mailAddress: g.mailAddress,
    hotel: { id: g.hotel.id },
  };
}

const EMPTY: GuestInput = {
  firstName: "",
  lastName: "",
  voucherNumber: "",
  checkInDate: "",
  checkOutDate: "",
  phoneNumber: "",
  mailAddress: "",
  hotel: { id: 0 },
};

export default function GuestForm({ guest, hotels, onSave, onCancel }: Props) {
  const [form, setForm] = useState<GuestInput>(EMPTY);

  useEffect(() => {
    setForm(guest ? toInput(guest) : { ...EMPTY, hotel: { id: hotels[0]?.id ?? 0 } });
  }, [guest, hotels]);

  function set<K extends keyof GuestInput>(field: K, value: GuestInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.hotel.id) {
      alert("Lütfen bir otel seçin.");
      return;
    }
    onSave(form);
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>
          {guest ? "Misafiri Düzenle" : "Yeni Misafir Ekle"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <label className={styles.label}>
              Ad
              <input
                id="guest-first-name"
                className={styles.input}
                required
                value={form.firstName}
                onChange={(e) => set("firstName", e.target.value)}
              />
            </label>
            <label className={styles.label}>
              Soyad
              <input
                id="guest-last-name"
                className={styles.input}
                required
                value={form.lastName}
                onChange={(e) => set("lastName", e.target.value)}
              />
            </label>
          </div>

          <label className={styles.label}>
            Voucher No
            <input
              id="guest-voucher"
              className={styles.input}
              required
              value={form.voucherNumber}
              onChange={(e) => set("voucherNumber", e.target.value)}
            />
          </label>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Giriş Tarihi
              <input
                id="guest-checkin"
                type="date"
                className={styles.input}
                required
                value={form.checkInDate}
                onChange={(e) => set("checkInDate", e.target.value)}
              />
            </label>
            <label className={styles.label}>
              Çıkış Tarihi
              <input
                id="guest-checkout"
                type="date"
                className={styles.input}
                required
                value={form.checkOutDate}
                onChange={(e) => set("checkOutDate", e.target.value)}
              />
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.label}>
              Telefon
              <input
                id="guest-phone"
                className={styles.input}
                required
                value={form.phoneNumber}
                onChange={(e) => set("phoneNumber", e.target.value)}
              />
            </label>
            <label className={styles.label}>
              E-posta
              <input
                id="guest-email"
                type="email"
                className={styles.input}
                required
                value={form.mailAddress}
                onChange={(e) => set("mailAddress", e.target.value)}
              />
            </label>
          </div>

          <label className={styles.label}>
            Otel
            <select
              id="guest-hotel"
              className={styles.select}
              required
              value={form.hotel.id}
              onChange={(e) => set("hotel", { id: Number(e.target.value) })}
            >
              <option value={0} disabled>
                Otel seçin…
              </option>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.hotelName}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.formActions}>
            <button type="submit" id="guest-save" className={styles.btnPrimary}>
              Kaydet
            </button>
            <button
              type="button"
              id="guest-cancel"
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
