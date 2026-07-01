"use client";
import { Guest } from "@/lib/api";
import styles from "./Guests.module.css";

interface Props {
  guests: Guest[];
  onEdit: (guest: Guest) => void;
  onDelete: (id: number) => void;
}

export default function GuestList({ guests, onEdit, onDelete }: Props) {
  if (guests.length === 0) {
    return <p className={styles.empty}>Henüz misafir eklenmemiş.</p>;
  }
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Voucher No</th>
            <th>Giriş</th>
            <th>Çıkış</th>
            <th>Telefon</th>
            <th>E-posta</th>
            <th>Otel</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.firstName}</td>
              <td>{g.lastName}</td>
              <td>{g.voucherNumber}</td>
              <td>{g.checkInDate}</td>
              <td>{g.checkOutDate}</td>
              <td>{g.phoneNumber}</td>
              <td>{g.mailAddress}</td>
              <td>{g.hotel?.hotelName ?? "—"}</td>
              <td className={styles.actions}>
                <button
                  id={`edit-guest-${g.id}`}
                  className={styles.btnEdit}
                  onClick={() => onEdit(g)}
                >
                  Düzenle
                </button>
                <button
                  id={`delete-guest-${g.id}`}
                  className={styles.btnDelete}
                  onClick={() => {
                    if (
                      confirm(
                        `"${g.firstName} ${g.lastName}" misafiri silinsin mi?`
                      )
                    ) {
                      onDelete(g.id);
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
