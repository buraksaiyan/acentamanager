// All requests go through the Next.js proxy at /api/* → http://localhost:8080/*
// This avoids CORS issues without any backend changes.
// To change the backend URL, edit NEXT_PUBLIC_API_URL in frontend/.env.local
// AND update next.config.ts (the proxy also reads it).
const BASE = "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status} ${text}`);
  }
  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Hotel {
  id: number;
  hotelName: string;
  hotelAddress: string;
  hotelMailAddress: string;
  hotelPhoneNumber: string;
}

export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  voucherNumber: string;
  checkInDate: string;   // YYYY-MM-DD
  checkOutDate: string;  // YYYY-MM-DD
  phoneNumber: string;
  mailAddress: string;
  hotel: Hotel;
}

export type HotelInput = Omit<Hotel, "id">;
export type GuestInput = Omit<Guest, "id" | "hotel"> & { hotel: { id: number } };

// ─── Hotels ───────────────────────────────────────────────────────────────────

export const getHotels = () => request<Hotel[]>("/hotels");
export const getHotel = (id: number) => request<Hotel>(`/hotels/${id}`);
export const createHotel = (data: HotelInput) =>
  request<Hotel>("/hotels", { method: "POST", body: JSON.stringify(data) });
export const updateHotel = (id: number, data: Partial<HotelInput>) =>
  request<Hotel>(`/hotels/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteHotel = (id: number) =>
  request<void>(`/hotels/${id}`, { method: "DELETE" });

// ─── Guests ───────────────────────────────────────────────────────────────────

export const getGuests = () => request<Guest[]>("/guests");
export const getGuest = (id: number) => request<Guest>(`/guests/${id}`);
export const createGuest = (data: GuestInput) =>
  request<Guest>("/guests", { method: "POST", body: JSON.stringify(data) });
export const updateGuest = (id: number, data: Partial<GuestInput>) =>
  request<Guest>(`/guests/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteGuest = (id: number) =>
  request<void>(`/guests/${id}`, { method: "DELETE" });

export type SortField = "checkindate" | "checkoutdate" | "lastname";
export type SortDir = "asc" | "desc";

export const getSortedGuests = (sortBy: SortField, direction: SortDir = "asc") => {
  const params = new URLSearchParams({ sortBy, direction });
  return request<Guest[]>(`/guests/sorted?${params}`);
};

export const getFilteredGuests = (filters: {
  voucherNumber?: string;
  lastName?: string;
}) => {
  const params = new URLSearchParams();
  if (filters.voucherNumber) params.set("voucherNumber", filters.voucherNumber);
  if (filters.lastName) params.set("lastName", filters.lastName);
  return request<Guest[]>(`/guests/filter?${params}`);
};
