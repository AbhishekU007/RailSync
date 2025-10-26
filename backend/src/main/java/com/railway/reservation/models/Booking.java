package com.railway.reservation.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    
    @Id
    private String id;
    
    @DBRef
    private User user;
    
    @DBRef
    private Train train;
    
    private String passengerName;
    private Integer passengerAge;
    private String passengerGender;
    private Integer numberOfSeats;
    private Double totalPrice;
    
    private LocalDate travelDate;
    private String travelClass;
    
    private LocalDateTime bookingDate = LocalDateTime.now();
    private String status = "CONFIRMED";
}