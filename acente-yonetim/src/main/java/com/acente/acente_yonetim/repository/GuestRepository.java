package com.acente.acente_yonetim.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.acente.acente_yonetim.entity.Guest;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findAllByOrderByCheckInDateAsc();

    List<Guest> findAllByOrderByCheckInDateDesc();

    List<Guest> findAllByOrderByCheckOutDateAsc();

    List<Guest> findAllByOrderByCheckOutDateDesc();

    List<Guest> findAllByOrderByLastNameAsc();

    List<Guest> findAllByOrderByLastNameDesc();

    List<Guest> findByVoucherNumber(String voucherNumber);

    List<Guest> findByLastNameContainingIgnoreCase(String lastName);
}