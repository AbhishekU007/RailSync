package com.railway.reservation.services;

import com.railway.reservation.models.Train;
import com.railway.reservation.repositories.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TrainService {
    
    @Autowired
    private TrainRepository trainRepository;
    
    // Add new train
    public Train addTrain(Train train) {
        train.setAvailableSeats(train.getTotalSeats());
        train.setAvailableGeneralSeats(train.getGeneralSeats());
        train.setAvailableSleeperSeats(train.getSleeperSeats());
        train.setAvailableThirdAcSeats(train.getThirdAcSeats());
        train.setAvailableSecondAcSeats(train.getSecondAcSeats());
        train.setAvailableFirstAcSeats(train.getFirstAcSeats());
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
        return trainRepository.findBySourceAndDestination(source, destination);
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
                train.setAvailableGeneralSeats(train.getAvailableGeneralSeats() - seats);
                break;
            case "SLEEPER":
                train.setAvailableSleeperSeats(train.getAvailableSleeperSeats() - seats);
                break;
            case "THIRD_AC":
                train.setAvailableThirdAcSeats(train.getAvailableThirdAcSeats() - seats);
                break;
            case "SECOND_AC":
                train.setAvailableSecondAcSeats(train.getAvailableSecondAcSeats() - seats);
                break;
            case "FIRST_AC":
                train.setAvailableFirstAcSeats(train.getAvailableFirstAcSeats() - seats);
                break;
            default:
                throw new RuntimeException("Invalid travel class");
        }
        
        train.setAvailableSeats(train.getAvailableSeats() - seats);
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
                return train.getAvailableGeneralSeats();
            case "SLEEPER":
                return train.getAvailableSleeperSeats();
            case "THIRD_AC":
                return train.getAvailableThirdAcSeats();
            case "SECOND_AC":
                return train.getAvailableSecondAcSeats();
            case "FIRST_AC":
                return train.getAvailableFirstAcSeats();
            default:
                return train.getAvailableSeats();
        }
    }
}