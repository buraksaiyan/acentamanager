package com.acente.acente_yonetim.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;

@Entity
public class Guest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String voucherNumber;
    private String checkInDate;
    private String checkOutDate;
    private String phoneNumber;
    private String mailAddress;

    @ManyToOne
    private Hotel hotel;
}