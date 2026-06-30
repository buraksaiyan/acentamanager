package com.acente.acente_yonetim.service;

import java.util.List;
import com.acente.acente_yonetim.entity.Guest;
import com.acente.acente_yonetim.repository.GuestRepository;

public class GuestService {
    private final GuestRepository guestRepository;

    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public Guest createGuest(Guest guest) {
        return guestRepository.save(guest);
    }

    public List<Guest> getAllGuests() {
        return guestRepository.findAll();
    }

    public Guest getGuestById(Long id) {
        return guestRepository.findById(id).orElseThrow();
    }

    public Guest updateGuest(Long id, Guest guestDetails) {
        Guest guest = guestRepository.findById(id).orElseThrow();
        guest.setFirstName(guestDetails.getFirstName());
        guest.setLastName(guestDetails.getLastName());
        guest.setVoucherNumber(guestDetails.getVoucherNumber());
        guest.setCheckInDate(guestDetails.getCheckInDate());
        guest.setCheckOutDate(guestDetails.getCheckOutDate());
        guest.setPhoneNumber(guestDetails.getPhoneNumber());
        guest.setMailAddress(guestDetails.getMailAddress());
        if (guestDetails.getFirstName() != null) {
            guest.setFirstName(guestDetails.getFirstName());
        }
        if (guestDetails.getLastName() != null) {
            guest.setLastName(guestDetails.getLastName());
        }
        if (guestDetails.getVoucherNumber() != null) {
            guest.setVoucherNumber(guestDetails.getVoucherNumber());
        }
        if (guestDetails.getCheckInDate() != null) {
            guest.setCheckInDate(guestDetails.getCheckInDate());
        }
        if (guestDetails.getCheckOutDate() != null) {
            guest.setCheckOutDate(guestDetails.getCheckOutDate());
        }
        if (guestDetails.getPhoneNumber() != null) {
            guest.setPhoneNumber(guestDetails.getPhoneNumber());
        }
        if (guestDetails.getMailAddress() != null) {
            guest.setMailAddress(guestDetails.getMailAddress());
        }
        return guestRepository.save(guest);
    }

    public void deleteGuest(Long id) {
        guestRepository.deleteById(id);
    }
}