"use client";
import { Hotel } from "@/lib/api";
import styles from "./Hotels.module.css";

interface Props {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
  onDelete: (id: number) => void;
}

export default function HotelList({ hotels, onEdit, onDelete }: Props) {
  if (hotels.length === 0) {
    return <p className={styles.empty}>Henüz otel eklenmemiş.</p>;
  }
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Adres</th>
            <th>E-posta</th>
            <th>Telefon</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.hotelName}</td>
              <td>{h.hotelAddress}</td>
              <td>{h.hotelMailAddress}</td>
              <td>{h.hotelPhoneNumber}</td>
              <td className={styles.actions}>
                <button
                  id={`edit-hotel-${h.id}`}
                  className={styles.btnEdit}
                  onClick={() => onEdit(h)}
                >
                  Düzenle
                </button>
                <button
                  id={`delete-hotel-${h.id}`}
                  className={styles.btnDelete}
                  onClick={() => {
                    if (confirm(`"${h.hotelName}" oteli silinsin mi?`)) {
                      onDelete(h.id);
                    }
                  }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
