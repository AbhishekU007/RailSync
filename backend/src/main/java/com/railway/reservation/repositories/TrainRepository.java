package com.railway.reservation.repositories;

import com.railway.reservation.models.Train;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TrainRepository extends MongoRepository<Train, String> {
    List<Train> findBySourceAndDestination(String source, String destination);
    Optional<Train> findByTrainNumber(String trainNumber);
}