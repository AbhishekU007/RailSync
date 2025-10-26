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
        
        // Check available seats for this specific date and class
        Integer bookedSeats = getBookedSeatsForDateAndClass(trainId, booking.getTravelDate(), booking.getTravelClass());
        Integer totalSeatsForClass = trainService.getTotalSeatsByClass(train, booking.getTravelClass());
        Integer availableSeats = totalSeatsForClass - bookedSeats;
        
        if (availableSeats < booking.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available in " + booking.getTravelClass() + " class for this date. Only " + availableSeats + " seats available.");
        }
        
        booking.setUser(user);
        booking.setTrain(train);
        
        Double pricePerSeat = trainService.getPriceByClass(train, booking.getTravelClass());
        booking.setTotalPrice(pricePerSeat * booking.getNumberOfSeats());
        
        return bookingRepository.save(booking);
    }
    
    // Get booked seats for a specific train, date, and class
    private Integer getBookedSeatsForDateAndClass(String trainId, java.time.LocalDate travelDate, String travelClass) {
        List<Booking> bookings = bookingRepository.findByTrainIdAndTravelDateAndTravelClassAndStatus(
            trainId, travelDate, travelClass, "CONFIRMED"
        );
        
        return bookings.stream()
            .mapToInt(Booking::getNumberOfSeats)
            .sum();
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
        
        // No need to update train seats since we're calculating availability dynamically
    }
    
    // Get all bookings (admin)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}