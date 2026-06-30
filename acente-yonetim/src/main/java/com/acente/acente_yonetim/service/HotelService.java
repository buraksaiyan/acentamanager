package com.acente.acente_yonetim.service;

import java.util.List;

import com.acente.acente_yonetim.entity.Hotel;
import com.acente.acente_yonetim.repository.HotelRepository;

public class HotelService {
    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElseThrow();
    }

    public Hotel updateHotel(Long id, Hotel hotelDetails) {
        Hotel hotel = hotelRepository.findById(id).orElseThrow();
        hotel.setHotelName(hotelDetails.getHotelName());
        hotel.setHotelAddress(hotelDetails.getHotelAddress());
        hotel.setHotelMailAddress(hotelDetails.getHotelMailAddress());
        hotel.setHotelPhoneNumber(hotelDetails.getHotelPhoneNumber());
        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
