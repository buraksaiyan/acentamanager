package com.acente.acente_yonetim.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acente.acente_yonetim.entity.Guest;
import com.acente.acente_yonetim.repository.GuestRepository;

@Service
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

    public List<Guest> getSortedGuests(String sortBy, String direction) {
        boolean asc = !"desc".equalsIgnoreCase(direction);
        switch (sortBy.toLowerCase()) {
            case "checkindate":
                return asc ? guestRepository.findAllByOrderByCheckInDateAsc()
                        : guestRepository.findAllByOrderByCheckInDateDesc();
            case "checkoutdate":
                return asc ? guestRepository.findAllByOrderByCheckOutDateAsc()
                        : guestRepository.findAllByOrderByCheckOutDateDesc();
            case "lastname":
                return asc ? guestRepository.findAllByOrderByLastNameAsc()
                        : guestRepository.findAllByOrderByLastNameDesc();
            default:
                return guestRepository.findAll();
        }
    }

    public List<Guest> filterGuests(String voucherNumber, String lastName) {
        if (voucherNumber != null && !voucherNumber.isEmpty()) {
            return guestRepository.findByVoucherNumber(voucherNumber);
        }
        if (lastName != null && !lastName.isEmpty()) {
            return guestRepository.findByLastNameContainingIgnoreCase(lastName);
        }
        return guestRepository.findAll();
    }
}