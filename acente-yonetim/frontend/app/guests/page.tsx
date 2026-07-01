"use client";
import { useCallback, useEffect, useState } from "react";
import {
  createGuest,
  deleteGuest,
  getFilteredGuests,
  getGuests,
  getHotels,
  getSortedGuests,
  Guest,
  GuestInput,
  Hotel,
  SortDir,
  SortField,
  updateGuest,
} from "@/lib/api";
import GuestList from "@/components/guests/GuestList";
import GuestForm from "@/components/guests/GuestForm";
import SortControls from "@/components/guests/SortControls";
import FilterControls from "@/components/guests/FilterControls";
import styles from "./guests.module.css";

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Guest | null>(null);

  // Sort state
  const [sortBy, setSortBy] = useState<SortField | "">("");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Filter state (active filter)
  const [activeFilter, setActiveFilter] = useState<{
    voucherNumber?: string;
    lastName?: string;
  } | null>(null);

  const loadHotels = useCallback(async () => {
    try { setHotels(await getHotels()); } catch { /* non-critical */ }
  }, []);

  const loadGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data: Guest[];
      if (activeFilter && (activeFilter.voucherNumber || activeFilter.lastName)) {
        data = await getFilteredGuests(activeFilter);
      } else if (sortBy) {
        data = await getSortedGuests(sortBy, sortDir);
      } else {
        data = await getGuests();
      }
      setGuests(data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortDir, activeFilter]);

  useEffect(() => { loadHotels(); }, [loadHotels]);
  useEffect(() => { loadGuests(); }, [loadGuests]);

  function handleSort(field: SortField, dir: SortDir) {
    setActiveFilter(null);
    setSortBy(field);
    setSortDir(dir);
  }

  function handleClearSort() {
    setSortBy("");
    setSortDir("asc");
  }

  function handleFilter(filters: { voucherNumber?: string; lastName?: string }) {
    setSortBy("");
    setActiveFilter(filters);
  }

  function handleClearFilter() {
    setActiveFilter(null);
  }

  async function handleSave(data: GuestInput) {
    try {
      if (editing) {
        await updateGuest(editing.id, data);
      } else {
        await createGuest(data);
      }
      setShowForm(false);
      setEditing(null);
      await loadGuests();
    } catch (e) {
      alert(`Hata: ${e}`);
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteGuest(id);
      await loadGuests();
    } catch (e) {
      alert(`Hata: ${e}`);
    }
  }

  function handleEdit(guest: Guest) {
    setEditing(guest);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditing(null);
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Misafirler</h1>
        <button
          id="add-guest-btn"
          className={styles.btnAdd}
          onClick={() => { setEditing(null); setShowForm(true); }}
        >
          + Misafir Ekle
        </button>
      </div>

      <div className={styles.controls}>
        <SortControls
          sortBy={sortBy}
          direction={sortDir}
          onSort={handleSort}
          onClear={handleClearSort}
        />
        <div className={styles.divider} />
        <FilterControls
          onFilter={handleFilter}
          onClear={handleClearFilter}
        />
      </div>

      {loading && <p className={styles.status}>Yükleniyor…</p>}
      {error && <p className={styles.error}>Hata: {error}</p>}
      {!loading && !error && (
        <GuestList
          guests={guests}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <GuestForm
          guest={editing}
          hotels={hotels}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </main>
  );
}
