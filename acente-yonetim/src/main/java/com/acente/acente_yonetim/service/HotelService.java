package com.acente.acente_yonetim.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acente.acente_yonetim.entity.Hotel;
import com.acente.acente_yonetim.repository.HotelRepository;

@Service
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
        if (hotelDetails.getHotelName() != null) {
            hotel.setHotelName(hotelDetails.getHotelName());
        }
        if (hotelDetails.getHotelAddress() != null) {
            hotel.setHotelAddress(hotelDetails.getHotelAddress());
        }
        if (hotelDetails.getHotelMailAddress() != null) {
            hotel.setHotelMailAddress(hotelDetails.getHotelMailAddress());
        }
        if (hotelDetails.getHotelPhoneNumber() != null) {
            hotel.setHotelPhoneNumber(hotelDetails.getHotelPhoneNumber());
        }
        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
