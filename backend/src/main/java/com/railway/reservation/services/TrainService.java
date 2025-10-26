package com.railway.reservation.services;

import com.railway.reservation.models.Train;
import com.railway.reservation.models.Booking;
import com.railway.reservation.repositories.TrainRepository;
import com.railway.reservation.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class TrainService {
    
    @Autowired
    private TrainRepository trainRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    // Add new train
    public Train addTrain(Train train) {
        // Calculate total seats if not provided
        if (train.getTotalSeats() == null || train.getTotalSeats() == 0) {
            int total = (train.getGeneralSeats() != null ? train.getGeneralSeats() : 0) +
                       (train.getSleeperSeats() != null ? train.getSleeperSeats() : 0) +
                       (train.getThirdAcSeats() != null ? train.getThirdAcSeats() : 0) +
                       (train.getSecondAcSeats() != null ? train.getSecondAcSeats() : 0) +
                       (train.getFirstAcSeats() != null ? train.getFirstAcSeats() : 0);
            train.setTotalSeats(total);
        }
        
        train.setAvailableSeats(train.getTotalSeats());
        train.setAvailableGeneralSeats(train.getGeneralSeats() != null ? train.getGeneralSeats() : 0);
        train.setAvailableSleeperSeats(train.getSleeperSeats() != null ? train.getSleeperSeats() : 0);
        train.setAvailableThirdAcSeats(train.getThirdAcSeats() != null ? train.getThirdAcSeats() : 0);
        train.setAvailableSecondAcSeats(train.getSecondAcSeats() != null ? train.getSecondAcSeats() : 0);
        train.setAvailableFirstAcSeats(train.getFirstAcSeats() != null ? train.getFirstAcSeats() : 0);
        return trainRepository.save(train);
    }
    
    // Get all trains
    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }
    
    // Get train by ID
    public Train getTrainById(String id) {
        return trainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Train not found"));
    }
    
    // Search trains by source and destination
    public List<Train> searchTrains(String source, String destination) {
        return trainRepository.findBySourceIgnoreCaseAndDestinationIgnoreCase(source, destination);
    }
    
    // Update train
    public Train updateTrain(String id, Train updatedTrain) {
        Train train = getTrainById(id);
        train.setTrainName(updatedTrain.getTrainName());
        train.setTrainNumber(updatedTrain.getTrainNumber());
        train.setSource(updatedTrain.getSource());
        train.setDestination(updatedTrain.getDestination());
        train.setDepartureTime(updatedTrain.getDepartureTime());
        train.setArrivalTime(updatedTrain.getArrivalTime());
        train.setTotalSeats(updatedTrain.getTotalSeats());
        train.setPrice(updatedTrain.getPrice());
        train.setGeneralPrice(updatedTrain.getGeneralPrice());
        train.setSleeperPrice(updatedTrain.getSleeperPrice());
        train.setThirdAcPrice(updatedTrain.getThirdAcPrice());
        train.setSecondAcPrice(updatedTrain.getSecondAcPrice());
        train.setFirstAcPrice(updatedTrain.getFirstAcPrice());
        train.setGeneralSeats(updatedTrain.getGeneralSeats());
        train.setSleeperSeats(updatedTrain.getSleeperSeats());
        train.setThirdAcSeats(updatedTrain.getThirdAcSeats());
        train.setSecondAcSeats(updatedTrain.getSecondAcSeats());
        train.setFirstAcSeats(updatedTrain.getFirstAcSeats());
        return trainRepository.save(train);
    }
    
    // Delete train
    public void deleteTrain(String id) {
        trainRepository.deleteById(id);
    }
    
    // Update available seats
    public void updateAvailableSeats(String trainId, Integer seats) {
        Train train = getTrainById(trainId);
        train.setAvailableSeats(train.getAvailableSeats() - seats);
        trainRepository.save(train);
    }
    
    public void updateAvailableSeatsByClass(String trainId, Integer seats, String travelClass) {
        Train train = getTrainById(trainId);
        
        switch (travelClass.toUpperCase()) {
            case "GENERAL":
                int newGeneralSeats = (train.getAvailableGeneralSeats() != null ? train.getAvailableGeneralSeats() : 0) - seats;
                train.setAvailableGeneralSeats(newGeneralSeats);
                break;
            case "SLEEPER":
                int newSleeperSeats = (train.getAvailableSleeperSeats() != null ? train.getAvailableSleeperSeats() : 0) - seats;
                train.setAvailableSleeperSeats(newSleeperSeats);
                break;
            case "THIRD_AC":
                int newThirdAcSeats = (train.getAvailableThirdAcSeats() != null ? train.getAvailableThirdAcSeats() : 0) - seats;
                train.setAvailableThirdAcSeats(newThirdAcSeats);
                break;
            case "SECOND_AC":
                int newSecondAcSeats = (train.getAvailableSecondAcSeats() != null ? train.getAvailableSecondAcSeats() : 0) - seats;
                train.setAvailableSecondAcSeats(newSecondAcSeats);
                break;
            case "FIRST_AC":
                int newFirstAcSeats = (train.getAvailableFirstAcSeats() != null ? train.getAvailableFirstAcSeats() : 0) - seats;
                train.setAvailableFirstAcSeats(newFirstAcSeats);
                break;
            default:
                throw new RuntimeException("Invalid travel class");
        }
        
        int totalAvailable = (train.getAvailableSeats() != null ? train.getAvailableSeats() : 0) - seats;
        train.setAvailableSeats(totalAvailable);
        trainRepository.save(train);
    }
    
    public Double getPriceByClass(Train train, String travelClass) {
        switch (travelClass.toUpperCase()) {
            case "GENERAL":
                return train.getGeneralPrice();
            case "SLEEPER":
                return train.getSleeperPrice();
            case "THIRD_AC":
                return train.getThirdAcPrice();
            case "SECOND_AC":
                return train.getSecondAcPrice();
            case "FIRST_AC":
                return train.getFirstAcPrice();
            default:
                return train.getPrice();
        }
    }
    
    public Integer getAvailableSeatsByClass(Train train, String travelClass) {
        switch (travelClass.toUpperCase()) {
            case "GENERAL":
                return train.getAvailableGeneralSeats() != null ? train.getAvailableGeneralSeats() : 0;
            case "SLEEPER":
                return train.getAvailableSleeperSeats() != null ? train.getAvailableSleeperSeats() : 0;
            case "THIRD_AC":
                return train.getAvailableThirdAcSeats() != null ? train.getAvailableThirdAcSeats() : 0;
            case "SECOND_AC":
                return train.getAvailableSecondAcSeats() != null ? train.getAvailableSecondAcSeats() : 0;
            case "FIRST_AC":
                return train.getAvailableFirstAcSeats() != null ? train.getAvailableFirstAcSeats() : 0;
            default:
                return train.getAvailableSeats() != null ? train.getAvailableSeats() : 0;
        }
    }
    
    public Integer getTotalSeatsByClass(Train train, String travelClass) {
        switch (travelClass.toUpperCase()) {
            case "GENERAL":
                return train.getGeneralSeats() != null ? train.getGeneralSeats() : 0;
            case "SLEEPER":
                return train.getSleeperSeats() != null ? train.getSleeperSeats() : 0;
            case "THIRD_AC":
                return train.getThirdAcSeats() != null ? train.getThirdAcSeats() : 0;
            case "SECOND_AC":
                return train.getSecondAcSeats() != null ? train.getSecondAcSeats() : 0;
            case "FIRST_AC":
                return train.getFirstAcSeats() != null ? train.getFirstAcSeats() : 0;
            default:
                return train.getTotalSeats() != null ? train.getTotalSeats() : 0;
        }
    }
    
    // Get available seats for a specific date and class
    public Integer getAvailableSeatsForDate(String trainId, LocalDate travelDate, String travelClass) {
        Train train = getTrainById(trainId);
        Integer totalSeats = getTotalSeatsByClass(train, travelClass);
        
        // Get booked seats for this specific date and class
        List<Booking> bookings = bookingRepository.findByTrainIdAndTravelDateAndTravelClassAndStatus(
            trainId, travelDate, travelClass, "CONFIRMED"
        );
        
        Integer bookedSeats = bookings.stream()
            .mapToInt(Booking::getNumberOfSeats)
            .sum();
        
        return totalSeats - bookedSeats;
    }
}