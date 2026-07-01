package com.acente.acente_yonetim.controller;

import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.acente.acente_yonetim.entity.Guest;
import com.acente.acente_yonetim.service.GuestService;

@RestController
@RequestMapping("/guests")
public class GuestController {

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping
    public List<Guest> getAllGuests() {
        return guestService.getAllGuests();
    }

    @GetMapping("/{id}")
    public Guest getGuestById(@PathVariable Long id) {
        return guestService.getGuestById(id);
    }

    @PostMapping
    public Guest createGuest(@RequestBody Guest guest) {
        return guestService.createGuest(guest);
    }

    @PutMapping("/{id}")
    public Guest updateGuest(@PathVariable Long id, @RequestBody Guest guestDetails) {
        return guestService.updateGuest(id, guestDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteGuest(@PathVariable Long id) {
        guestService.deleteGuest(id);
    }

    @GetMapping("/sorted")
    public List<Guest> getSortedGuests(@RequestParam String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {
        return guestService.getSortedGuests(sortBy, direction);
    }

    @GetMapping("/filter")
    public List<Guest> filterGuests(@RequestParam(required = false) String voucherNumber,
            @RequestParam(required = false) String lastName) {
        return guestService.filterGuests(voucherNumber, lastName);
    }
}