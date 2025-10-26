package com.railway.reservation.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "trains")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Train {
    
    @Id
    private String id;
    
    private String trainName;
    private String trainNumber;
    private String source;
    private String destination;
    private String departureTime;
    private String arrivalTime;
    
    private Integer totalSeats;
    private Integer availableSeats;
    private Double price;
    
    private Double generalPrice;
    private Double sleeperPrice;
    private Double thirdAcPrice;
    private Double secondAcPrice;
    private Double firstAcPrice;
    
    private Integer generalSeats;
    private Integer sleeperSeats;
    private Integer thirdAcSeats;
    private Integer secondAcSeats;
    private Integer firstAcSeats;
    
    private Integer availableGeneralSeats;
    private Integer availableSleeperSeats;
    private Integer availableThirdAcSeats;
    private Integer availableSecondAcSeats;
    private Integer availableFirstAcSeats;
}