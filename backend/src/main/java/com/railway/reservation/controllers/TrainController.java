package com.railway.reservation.controllers;

import com.railway.reservation.models.Train;
import com.railway.reservation.services.TrainService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trains")
public class TrainController {
    
    @Autowired
    private TrainService trainService;
    
    // Add new train (Admin)
    @PostMapping
    public ResponseEntity<?> addTrain(@Valid @RequestBody Train train) {
        try {
            Train newTrain = trainService.addTrain(train);
            return ResponseEntity.status(HttpStatus.CREATED).body(newTrain);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // Get all trains
    @GetMapping
    public ResponseEntity<List<Train>> getAllTrains() {
        List<Train> trains = trainService.getAllTrains();
        return ResponseEntity.ok(trains);
    }
    
    // Get train by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTrainById(@PathVariable String id) {
        try {
            Train train = trainService.getTrainById(id);
            return ResponseEntity.ok(train);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // Search trains by source and destination
    @GetMapping("/search")
    public ResponseEntity<List<Train>> searchTrains(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam(required = false) String date) {
        List<Train> trains = trainService.searchTrains(source, destination);
        return ResponseEntity.ok(trains);
    }
    
    // Get all unique cities (for autocomplete)
    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        List<String> cities = trainService.getAllUniqueCities();
        return ResponseEntity.ok(cities);
    }
    
    // Get available seats for a specific train, date, and class
    @GetMapping("/{id}/availability")
    public ResponseEntity<?> getTrainAvailability(
            @PathVariable String id,
            @RequestParam String date,
            @RequestParam String travelClass) {
        try {
            java.time.LocalDate travelDate = java.time.LocalDate.parse(date);
            Train train = trainService.getTrainById(id);
            int availableSeats = trainService.getAvailableSeatsForDate(id, travelDate, travelClass);
            
            Map<String, Object> response = new HashMap<>();
            response.put("trainId", id);
            response.put("date", date);
            response.put("class", travelClass);
            response.put("availableSeats", availableSeats);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // Update train (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTrain(
            @PathVariable String id,
            @Valid @RequestBody Train train) {
        try {
            Train updatedTrain = trainService.updateTrain(id, train);
            return ResponseEntity.ok(updatedTrain);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
    
    // Delete train (Admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTrain(@PathVariable String id) {
        try {
            trainService.deleteTrain(id);
            return ResponseEntity.ok(Map.of("message", "Train deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}