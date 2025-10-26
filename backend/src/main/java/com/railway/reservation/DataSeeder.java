package com.railway.reservation;

import com.railway.reservation.models.Train;
import com.railway.reservation.models.User;
import com.railway.reservation.repositories.TrainRepository;
import com.railway.reservation.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * This class seeds initial data into the database
 * Comment out @Component annotation after first run to avoid duplicate data
 */
@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainRepository trainRepository;

    @Override
    public void run(String... args) throws Exception {
        // Check if data already exists
        if (userRepository.count() > 0 || trainRepository.count() > 0) {
            System.out.println("Data already exists. Skipping seeding.");
            return;
        }

        System.out.println("Seeding initial data...");

        // Create Admin User
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@railway.com");
        admin.setPassword("admin123");
        admin.setPhone("9876543210");
        admin.setRole("ADMIN");
        userRepository.save(admin);

        // Create Regular User
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john@example.com");
        user.setPassword("password123");
        user.setPhone("9876543211");
        user.setRole("USER");
        userRepository.save(user);

        // Create Sample Trains
        Train train1 = new Train();
        train1.setTrainName("Rajdhani Express");
        train1.setTrainNumber("12001");
        train1.setSource("Delhi");
        train1.setDestination("Mumbai");
        train1.setDepartureTime("16:00");
        train1.setArrivalTime("08:30");
        train1.setTotalSeats(500);
        train1.setAvailableSeats(500);
        train1.setPrice(1500.0);
        train1.setGeneralPrice(500.0);
        train1.setSleeperPrice(800.0);
        train1.setThirdAcPrice(1200.0);
        train1.setSecondAcPrice(1800.0);
        train1.setFirstAcPrice(2500.0);
        train1.setGeneralSeats(100);
        train1.setSleeperSeats(150);
        train1.setThirdAcSeats(100);
        train1.setSecondAcSeats(100);
        train1.setFirstAcSeats(50);
        train1.setAvailableGeneralSeats(100);
        train1.setAvailableSleeperSeats(150);
        train1.setAvailableThirdAcSeats(100);
        train1.setAvailableSecondAcSeats(100);
        train1.setAvailableFirstAcSeats(50);
        trainRepository.save(train1);

        Train train2 = new Train();
        train2.setTrainName("Shatabdi Express");
        train2.setTrainNumber("12002");
        train2.setSource("Chennai");
        train2.setDestination("Bangalore");
        train2.setDepartureTime("06:00");
        train2.setArrivalTime("11:30");
        train2.setTotalSeats(300);
        train2.setAvailableSeats(300);
        train2.setPrice(800.0);
        train2.setGeneralPrice(300.0);
        train2.setSleeperPrice(500.0);
        train2.setThirdAcPrice(700.0);
        train2.setSecondAcPrice(1000.0);
        train2.setFirstAcPrice(1500.0);
        train2.setGeneralSeats(60);
        train2.setSleeperSeats(90);
        train2.setThirdAcSeats(60);
        train2.setSecondAcSeats(60);
        train2.setFirstAcSeats(30);
        train2.setAvailableGeneralSeats(60);
        train2.setAvailableSleeperSeats(90);
        train2.setAvailableThirdAcSeats(60);
        train2.setAvailableSecondAcSeats(60);
        train2.setAvailableFirstAcSeats(30);
        trainRepository.save(train2);

        Train train3 = new Train();
        train3.setTrainName("Duronto Express");
        train3.setTrainNumber("12003");
        train3.setSource("Kolkata");
        train3.setDestination("Delhi");
        train3.setDepartureTime("20:00");
        train3.setArrivalTime("12:30");
        train3.setTotalSeats(400);
        train3.setAvailableSeats(400);
        train3.setPrice(1200.0);
        train3.setGeneralPrice(400.0);
        train3.setSleeperPrice(650.0);
        train3.setThirdAcPrice(950.0);
        train3.setSecondAcPrice(1400.0);
        train3.setFirstAcPrice(2000.0);
        train3.setGeneralSeats(80);
        train3.setSleeperSeats(120);
        train3.setThirdAcSeats(80);
        train3.setSecondAcSeats(80);
        train3.setFirstAcSeats(40);
        train3.setAvailableGeneralSeats(80);
        train3.setAvailableSleeperSeats(120);
        train3.setAvailableThirdAcSeats(80);
        train3.setAvailableSecondAcSeats(80);
        train3.setAvailableFirstAcSeats(40);
        trainRepository.save(train3);

        Train train4 = new Train();
        train4.setTrainName("Garib Rath");
        train4.setTrainNumber("12004");
        train4.setSource("Mumbai");
        train4.setDestination("Delhi");
        train4.setDepartureTime("12:00");
        train4.setArrivalTime("06:00");
        train4.setTotalSeats(600);
        train4.setAvailableSeats(600);
        train4.setPrice(900.0);
        train4.setGeneralPrice(350.0);
        train4.setSleeperPrice(550.0);
        train4.setThirdAcPrice(850.0);
        train4.setSecondAcPrice(1200.0);
        train4.setFirstAcPrice(1700.0);
        train4.setGeneralSeats(120);
        train4.setSleeperSeats(180);
        train4.setThirdAcSeats(120);
        train4.setSecondAcSeats(120);
        train4.setFirstAcSeats(60);
        train4.setAvailableGeneralSeats(120);
        train4.setAvailableSleeperSeats(180);
        train4.setAvailableThirdAcSeats(120);
        train4.setAvailableSecondAcSeats(120);
        train4.setAvailableFirstAcSeats(60);
        trainRepository.save(train4);

        Train train5 = new Train();
        train5.setTrainName("Tejas Express");
        train5.setTrainNumber("12005");
        train5.setSource("Bangalore");
        train5.setDestination("Chennai");
        train5.setDepartureTime("14:30");
        train5.setArrivalTime("20:00");
        train5.setTotalSeats(250);
        train5.setAvailableSeats(250);
        train5.setPrice(600.0);
        train5.setGeneralPrice(250.0);
        train5.setSleeperPrice(400.0);
        train5.setThirdAcPrice(550.0);
        train5.setSecondAcPrice(800.0);
        train5.setFirstAcPrice(1200.0);
        train5.setGeneralSeats(50);
        train5.setSleeperSeats(75);
        train5.setThirdAcSeats(50);
        train5.setSecondAcSeats(50);
        train5.setFirstAcSeats(25);
        train5.setAvailableGeneralSeats(50);
        train5.setAvailableSleeperSeats(75);
        train5.setAvailableThirdAcSeats(50);
        train5.setAvailableSecondAcSeats(50);
        train5.setAvailableFirstAcSeats(25);
        trainRepository.save(train5);

        System.out.println("Data seeding completed successfully!");
        System.out.println("Admin credentials: admin@railway.com / admin123");
        System.out.println("User credentials: john@example.com / password123");
    }
}