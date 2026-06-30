package com.acente.acente_yonetim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.acente.acente_yonetim.entity.Guest;

public interface GuestRepository extends JpaRepository<Guest, Long> {

}