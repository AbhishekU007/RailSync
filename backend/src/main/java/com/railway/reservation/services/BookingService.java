package com.railway.reservation.services;

import com.railway.reservation.models.Booking;
import com.railway.reservation.models.Train;
import com.railway.reservation.models.User;
import com.railway.reservation.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private TrainService trainService;
    
    @Autowired
    private UserService userService;
    
    // Create booking
    @Transactional
    public Booking createBooking(Booking booking, String userId, String trainId) {
        User user = userService.getUserById(userId);
        Train train = trainService.getTrainById(trainId);
        
        Integer availableSeats = trainService.getAvailableSeatsByClass(train, booking.getTravelClass());
        
        if (availableSeats < booking.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available in " + booking.getTravelClass() + " class");
        }
        
        booking.setUser(user);
        booking.setTrain(train);
        
        Double pricePerSeat = trainService.getPriceByClass(train, booking.getTravelClass());
        booking.setTotalPrice(pricePerSeat * booking.getNumberOfSeats());
        
        trainService.updateAvailableSeatsByClass(trainId, booking.getNumberOfSeats(), booking.getTravelClass());
        
        return bookingRepository.save(booking);
    }
    
    // Get all bookings for a user
    public List<Booking> getUserBookings(String userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    // Get booking by ID
    public Booking getBookingById(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    
    // Cancel booking
    @Transactional
    public void cancelBooking(String bookingId) {
        Booking booking = getBookingById(bookingId);
        
        if ("CANCELLED".equals(booking.getStatus())) {
            throw new RuntimeException("Booking already cancelled");
        }
        
        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);
        
        Train train = booking.getTrain();
        
        switch (booking.getTravelClass().toUpperCase()) {
            case "GENERAL":
                train.setAvailableGeneralSeats(train.getAvailableGeneralSeats() + booking.getNumberOfSeats());
                break;
            case "SLEEPER":
                train.setAvailableSleeperSeats(train.getAvailableSleeperSeats() + booking.getNumberOfSeats());
                break;
            case "THIRD_AC":
                train.setAvailableThirdAcSeats(train.getAvailableThirdAcSeats() + booking.getNumberOfSeats());
                break;
            case "SECOND_AC":
                train.setAvailableSecondAcSeats(train.getAvailableSecondAcSeats() + booking.getNumberOfSeats());
                break;
            case "FIRST_AC":
                train.setAvailableFirstAcSeats(train.getAvailableFirstAcSeats() + booking.getNumberOfSeats());
                break;
        }
        
        train.setAvailableSeats(train.getAvailableSeats() + booking.getNumberOfSeats());
        trainService.updateTrain(train.getId(), train);
    }
    
    // Get all bookings (admin)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}