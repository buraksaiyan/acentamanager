"use client";
import { useCallback, useEffect, useState } from "react";
import {
  createHotel,
  deleteHotel,
  getHotels,
  Hotel,
  HotelInput,
  updateHotel,
} from "@/lib/api";
import HotelList from "@/components/hotels/HotelList";
import HotelForm from "@/components/hotels/HotelForm";
import styles from "./hotels.module.css";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Hotel | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setHotels(await getHotels());
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSave(data: HotelInput) {
    try {
      if (editing) {
        await updateHotel(editing.id, data);
      } else {
        await createHotel(data);
      }
      setShowForm(false);
      setEditing(null);
      await load();
    } catch (e) {
      alert(`Hata: ${e}`);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteHotel(id);
      await load();
    } catch (e) {
      alert(`Hata: ${e}`);
    }
  }

  function handleEdit(hotel: Hotel) {
    setEditing(hotel);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditing(null);
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Oteller</h1>
        <button
          id="add-hotel-btn"
          className={styles.btnAdd}
          onClick={() => { setEditing(null); setShowForm(true); }}
        >
          + Otel Ekle
        </button>
      </div>

      {loading && <p className={styles.status}>Yükleniyor…</p>}
      {error && <p className={styles.error}>Hata: {error}</p>}
      {!loading && !error && (
        <HotelList
          hotels={hotels}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <HotelForm
          hotel={editing}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
