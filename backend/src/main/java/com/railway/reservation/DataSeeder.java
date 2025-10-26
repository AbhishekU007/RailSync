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

        // Delhi to Mumbai - Additional trains
        Train train6 = new Train();
        train6.setTrainName("August Kranti Rajdhani");
        train6.setTrainNumber("12953");
        train6.setSource("Delhi");
        train6.setDestination("Mumbai");
        train6.setDepartureTime("17:00");
        train6.setArrivalTime("09:15");
        train6.setTotalSeats(450);
        train6.setGeneralPrice(550.0);
        train6.setSleeperPrice(850.0);
        train6.setThirdAcPrice(1250.0);
        train6.setSecondAcPrice(1900.0);
        train6.setFirstAcPrice(2700.0);
        train6.setGeneralSeats(90);
        train6.setSleeperSeats(135);
        train6.setThirdAcSeats(90);
        train6.setSecondAcSeats(90);
        train6.setFirstAcSeats(45);
        trainRepository.save(train6);

        Train train7 = new Train();
        train7.setTrainName("Mumbai Rajdhani");
        train7.setTrainNumber("12951");
        train7.setSource("Delhi");
        train7.setDestination("Mumbai");
        train7.setDepartureTime("16:30");
        train7.setArrivalTime("08:00");
        train7.setTotalSeats(480);
        train7.setGeneralPrice(520.0);
        train7.setSleeperPrice(820.0);
        train7.setThirdAcPrice(1220.0);
        train7.setSecondAcPrice(1850.0);
        train7.setFirstAcPrice(2600.0);
        train7.setGeneralSeats(96);
        train7.setSleeperSeats(144);
        train7.setThirdAcSeats(96);
        train7.setSecondAcSeats(96);
        train7.setFirstAcSeats(48);
        trainRepository.save(train7);

        // Mumbai to Delhi - Return trains
        Train train8 = new Train();
        train8.setTrainName("Mumbai Rajdhani");
        train8.setTrainNumber("12952");
        train8.setSource("Mumbai");
        train8.setDestination("Delhi");
        train8.setDepartureTime("16:50");
        train8.setArrivalTime("08:35");
        train8.setTotalSeats(480);
        train8.setGeneralPrice(520.0);
        train8.setSleeperPrice(820.0);
        train8.setThirdAcPrice(1220.0);
        train8.setSecondAcPrice(1850.0);
        train8.setFirstAcPrice(2600.0);
        train8.setGeneralSeats(96);
        train8.setSleeperSeats(144);
        train8.setThirdAcSeats(96);
        train8.setSecondAcSeats(96);
        train8.setFirstAcSeats(48);
        trainRepository.save(train8);

        // Delhi to Bangalore
        Train train9 = new Train();
        train9.setTrainName("Karnataka Express");
        train9.setTrainNumber("12627");
        train9.setSource("Delhi");
        train9.setDestination("Bangalore");
        train9.setDepartureTime("20:15");
        train9.setArrivalTime("06:00");
        train9.setTotalSeats(520);
        train9.setGeneralPrice(650.0);
        train9.setSleeperPrice(1000.0);
        train9.setThirdAcPrice(1450.0);
        train9.setSecondAcPrice(2200.0);
        train9.setFirstAcPrice(3200.0);
        train9.setGeneralSeats(104);
        train9.setSleeperSeats(156);
        train9.setThirdAcSeats(104);
        train9.setSecondAcSeats(104);
        train9.setFirstAcSeats(52);
        trainRepository.save(train9);

        // Bangalore to Delhi
        Train train10 = new Train();
        train10.setTrainName("Bangalore Rajdhani");
        train10.setTrainNumber("12429");
        train10.setSource("Bangalore");
        train10.setDestination("Delhi");
        train10.setDepartureTime("20:00");
        train10.setArrivalTime("05:30");
        train10.setTotalSeats(500);
        train10.setGeneralPrice(640.0);
        train10.setSleeperPrice(980.0);
        train10.setThirdAcPrice(1420.0);
        train10.setSecondAcPrice(2150.0);
        train10.setFirstAcPrice(3100.0);
        train10.setGeneralSeats(100);
        train10.setSleeperSeats(150);
        train10.setThirdAcSeats(100);
        train10.setSecondAcSeats(100);
        train10.setFirstAcSeats(50);
        trainRepository.save(train10);

        // Mumbai to Bangalore
        Train train11 = new Train();
        train11.setTrainName("Udyan Express");
        train11.setTrainNumber("11301");
        train11.setSource("Mumbai");
        train11.setDestination("Bangalore");
        train11.setDepartureTime("08:05");
        train11.setArrivalTime("07:25");
        train11.setTotalSeats(580);
        train11.setGeneralPrice(450.0);
        train11.setSleeperPrice(700.0);
        train11.setThirdAcPrice(1000.0);
        train11.setSecondAcPrice(1500.0);
        train11.setFirstAcPrice(2200.0);
        train11.setGeneralSeats(116);
        train11.setSleeperSeats(174);
        train11.setThirdAcSeats(116);
        train11.setSecondAcSeats(116);
        train11.setFirstAcSeats(58);
        trainRepository.save(train11);

        // Bangalore to Mumbai
        Train train12 = new Train();
        train12.setTrainName("Udyan Express");
        train12.setTrainNumber("11302");
        train12.setSource("Bangalore");
        train12.setDestination("Mumbai");
        train12.setDepartureTime("20:35");
        train12.setArrivalTime("19:50");
        train12.setTotalSeats(580);
        train12.setGeneralPrice(450.0);
        train12.setSleeperPrice(700.0);
        train12.setThirdAcPrice(1000.0);
        train12.setSecondAcPrice(1500.0);
        train12.setFirstAcPrice(2200.0);
        train12.setGeneralSeats(116);
        train12.setSleeperSeats(174);
        train12.setThirdAcSeats(116);
        train12.setSecondAcSeats(116);
        train12.setFirstAcSeats(58);
        trainRepository.save(train12);

        // Delhi to Chennai
        Train train13 = new Train();
        train13.setTrainName("Tamil Nadu Express");
        train13.setTrainNumber("12621");
        train13.setSource("Delhi");
        train13.setDestination("Chennai");
        train13.setDepartureTime("22:30");
        train13.setArrivalTime("07:30");
        train13.setTotalSeats(550);
        train13.setGeneralPrice(700.0);
        train13.setSleeperPrice(1050.0);
        train13.setThirdAcPrice(1500.0);
        train13.setSecondAcPrice(2300.0);
        train13.setFirstAcPrice(3400.0);
        train13.setGeneralSeats(110);
        train13.setSleeperSeats(165);
        train13.setThirdAcSeats(110);
        train13.setSecondAcSeats(110);
        train13.setFirstAcSeats(55);
        trainRepository.save(train13);

        // Chennai to Delhi
        Train train14 = new Train();
        train14.setTrainName("Grand Trunk Express");
        train14.setTrainNumber("12615");
        train14.setSource("Chennai");
        train14.setDestination("Delhi");
        train14.setDepartureTime("18:15");
        train14.setArrivalTime("04:00");
        train14.setTotalSeats(540);
        train14.setGeneralPrice(690.0);
        train14.setSleeperPrice(1030.0);
        train14.setThirdAcPrice(1480.0);
        train14.setSecondAcPrice(2250.0);
        train14.setFirstAcPrice(3300.0);
        train14.setGeneralSeats(108);
        train14.setSleeperSeats(162);
        train14.setThirdAcSeats(108);
        train14.setSecondAcSeats(108);
        train14.setFirstAcSeats(54);
        trainRepository.save(train14);

        // Kolkata to Mumbai
        Train train15 = new Train();
        train15.setTrainName("Gitanjali Express");
        train15.setTrainNumber("12859");
        train15.setSource("Kolkata");
        train15.setDestination("Mumbai");
        train15.setDepartureTime("14:50");
        train15.setArrivalTime("19:30");
        train15.setTotalSeats(600);
        train15.setGeneralPrice(750.0);
        train15.setSleeperPrice(1150.0);
        train15.setThirdAcPrice(1650.0);
        train15.setSecondAcPrice(2500.0);
        train15.setFirstAcPrice(3600.0);
        train15.setGeneralSeats(120);
        train15.setSleeperSeats(180);
        train15.setThirdAcSeats(120);
        train15.setSecondAcSeats(120);
        train15.setFirstAcSeats(60);
        trainRepository.save(train15);

        // Mumbai to Kolkata
        Train train16 = new Train();
        train16.setTrainName("Gitanjali Express");
        train16.setTrainNumber("12860");
        train16.setSource("Mumbai");
        train16.setDestination("Kolkata");
        train16.setDepartureTime("06:00");
        train16.setArrivalTime("10:45");
        train16.setTotalSeats(600);
        train16.setGeneralPrice(750.0);
        train16.setSleeperPrice(1150.0);
        train16.setThirdAcPrice(1650.0);
        train16.setSecondAcPrice(2500.0);
        train16.setFirstAcPrice(3600.0);
        train16.setGeneralSeats(120);
        train16.setSleeperSeats(180);
        train16.setThirdAcSeats(120);
        train16.setSecondAcSeats(120);
        train16.setFirstAcSeats(60);
        trainRepository.save(train16);

        // Delhi to Hyderabad
        Train train17 = new Train();
        train17.setTrainName("Telangana Express");
        train17.setTrainNumber("12723");
        train17.setSource("Delhi");
        train17.setDestination("Hyderabad");
        train17.setDepartureTime("17:40");
        train17.setArrivalTime("15:50");
        train17.setTotalSeats(490);
        train17.setGeneralPrice(620.0);
        train17.setSleeperPrice(950.0);
        train17.setThirdAcPrice(1380.0);
        train17.setSecondAcPrice(2100.0);
        train17.setFirstAcPrice(3000.0);
        train17.setGeneralSeats(98);
        train17.setSleeperSeats(147);
        train17.setThirdAcSeats(98);
        train17.setSecondAcSeats(98);
        train17.setFirstAcSeats(49);
        trainRepository.save(train17);

        // Hyderabad to Delhi
        Train train18 = new Train();
        train18.setTrainName("AP Express");
        train18.setTrainNumber("12708");
        train18.setSource("Hyderabad");
        train18.setDestination("Delhi");
        train18.setDepartureTime("14:50");
        train18.setArrivalTime("12:30");
        train18.setTotalSeats(510);
        train18.setGeneralPrice(630.0);
        train18.setSleeperPrice(960.0);
        train18.setThirdAcPrice(1400.0);
        train18.setSecondAcPrice(2120.0);
        train18.setFirstAcPrice(3050.0);
        train18.setGeneralSeats(102);
        train18.setSleeperSeats(153);
        train18.setThirdAcSeats(102);
        train18.setSecondAcSeats(102);
        train18.setFirstAcSeats(51);
        trainRepository.save(train18);

        // Mumbai to Goa - Multiple trains
        Train train19 = new Train();
        train19.setTrainName("Konkan Kanya Express");
        train19.setTrainNumber("10111");
        train19.setSource("Mumbai");
        train19.setDestination("Goa");
        train19.setDepartureTime("23:00");
        train19.setArrivalTime("11:30");
        train19.setTotalSeats(420);
        train19.setGeneralPrice(300.0);
        train19.setSleeperPrice(450.0);
        train19.setThirdAcPrice(650.0);
        train19.setSecondAcPrice(950.0);
        train19.setFirstAcPrice(1400.0);
        train19.setGeneralSeats(84);
        train19.setSleeperSeats(126);
        train19.setThirdAcSeats(84);
        train19.setSecondAcSeats(84);
        train19.setFirstAcSeats(42);
        trainRepository.save(train19);

        Train train20 = new Train();
        train20.setTrainName("Mandovi Express");
        train20.setTrainNumber("10103");
        train20.setSource("Mumbai");
        train20.setDestination("Goa");
        train20.setDepartureTime("07:10");
        train20.setArrivalTime("19:40");
        train20.setTotalSeats(450);
        train20.setGeneralPrice(320.0);
        train20.setSleeperPrice(470.0);
        train20.setThirdAcPrice(680.0);
        train20.setSecondAcPrice(980.0);
        train20.setFirstAcPrice(1450.0);
        train20.setGeneralSeats(90);
        train20.setSleeperSeats(135);
        train20.setThirdAcSeats(90);
        train20.setSecondAcSeats(90);
        train20.setFirstAcSeats(45);
        trainRepository.save(train20);

        // Delhi to Jaipur
        Train train21 = new Train();
        train21.setTrainName("Ajmer Shatabdi");
        train21.setTrainNumber("12015");
        train21.setSource("Delhi");
        train21.setDestination("Jaipur");
        train21.setDepartureTime("06:05");
        train21.setArrivalTime("10:30");
        train21.setTotalSeats(350);
        train21.setGeneralPrice(280.0);
        train21.setSleeperPrice(420.0);
        train21.setThirdAcPrice(600.0);
        train21.setSecondAcPrice(880.0);
        train21.setFirstAcPrice(1300.0);
        train21.setGeneralSeats(70);
        train21.setSleeperSeats(105);
        train21.setThirdAcSeats(70);
        train21.setSecondAcSeats(70);
        train21.setFirstAcSeats(35);
        trainRepository.save(train21);

        // Jaipur to Delhi
        Train train22 = new Train();
        train22.setTrainName("Ajmer Shatabdi");
        train22.setTrainNumber("12016");
        train22.setSource("Jaipur");
        train22.setDestination("Delhi");
        train22.setDepartureTime("17:40");
        train22.setArrivalTime("22:10");
        train22.setTotalSeats(350);
        train22.setGeneralPrice(280.0);
        train22.setSleeperPrice(420.0);
        train22.setThirdAcPrice(600.0);
        train22.setSecondAcPrice(880.0);
        train22.setFirstAcPrice(1300.0);
        train22.setGeneralSeats(70);
        train22.setSleeperSeats(105);
        train22.setThirdAcSeats(70);
        train22.setSecondAcSeats(70);
        train22.setFirstAcSeats(35);
        trainRepository.save(train22);

        // Delhi to Dehradun
        Train train23 = new Train();
        train23.setTrainName("Nanda Devi Express");
        train23.setTrainNumber("12205");
        train23.setSource("Delhi");
        train23.setDestination("Dehradun");
        train23.setDepartureTime("23:25");
        train23.setArrivalTime("05:15");
        train23.setTotalSeats(380);
        train23.setGeneralPrice(250.0);
        train23.setSleeperPrice(380.0);
        train23.setThirdAcPrice(550.0);
        train23.setSecondAcPrice(800.0);
        train23.setFirstAcPrice(1200.0);
        train23.setGeneralSeats(76);
        train23.setSleeperSeats(114);
        train23.setThirdAcSeats(76);
        train23.setSecondAcSeats(76);
        train23.setFirstAcSeats(38);
        trainRepository.save(train23);

        // Dehradun to Delhi
        Train train24 = new Train();
        train24.setTrainName("Nanda Devi Express");
        train24.setTrainNumber("12206");
        train24.setSource("Dehradun");
        train24.setDestination("Delhi");
        train24.setDepartureTime("21:50");
        train24.setArrivalTime("03:55");
        train24.setTotalSeats(380);
        train24.setGeneralPrice(250.0);
        train24.setSleeperPrice(380.0);
        train24.setThirdAcPrice(550.0);
        train24.setSecondAcPrice(800.0);
        train24.setFirstAcPrice(1200.0);
        train24.setGeneralSeats(76);
        train24.setSleeperSeats(114);
        train24.setThirdAcSeats(76);
        train24.setSecondAcSeats(76);
        train24.setFirstAcSeats(38);
        trainRepository.save(train24);

        // Chennai to Bangalore - Additional trains
        Train train25 = new Train();
        train25.setTrainName("Lalbagh Express");
        train25.setTrainNumber("12607");
        train25.setSource("Chennai");
        train25.setDestination("Bangalore");
        train25.setDepartureTime("12:45");
        train25.setArrivalTime("18:30");
        train25.setTotalSeats(320);
        train25.setGeneralPrice(290.0);
        train25.setSleeperPrice(480.0);
        train25.setThirdAcPrice(680.0);
        train25.setSecondAcPrice(980.0);
        train25.setFirstAcPrice(1450.0);
        train25.setGeneralSeats(64);
        train25.setSleeperSeats(96);
        train25.setThirdAcSeats(64);
        train25.setSecondAcSeats(64);
        train25.setFirstAcSeats(32);
        trainRepository.save(train25);

        // Pune to Mumbai
        Train train26 = new Train();
        train26.setTrainName("Deccan Express");
        train26.setTrainNumber("11007");
        train26.setSource("Pune");
        train26.setDestination("Mumbai");
        train26.setDepartureTime("07:15");
        train26.setArrivalTime("10:45");
        train26.setTotalSeats(280);
        train26.setGeneralPrice(180.0);
        train26.setSleeperPrice(280.0);
        train26.setThirdAcPrice(400.0);
        train26.setSecondAcPrice(580.0);
        train26.setFirstAcPrice(850.0);
        train26.setGeneralSeats(56);
        train26.setSleeperSeats(84);
        train26.setThirdAcSeats(56);
        train26.setSecondAcSeats(56);
        train26.setFirstAcSeats(28);
        trainRepository.save(train26);

        // Mumbai to Pune
        Train train27 = new Train();
        train27.setTrainName("Deccan Queen");
        train27.setTrainNumber("12123");
        train27.setSource("Mumbai");
        train27.setDestination("Pune");
        train27.setDepartureTime("17:10");
        train27.setArrivalTime("20:25");
        train27.setTotalSeats(290);
        train27.setGeneralPrice(185.0);
        train27.setSleeperPrice(290.0);
        train27.setThirdAcPrice(415.0);
        train27.setSecondAcPrice(600.0);
        train27.setFirstAcPrice(880.0);
        train27.setGeneralSeats(58);
        train27.setSleeperSeats(87);
        train27.setThirdAcSeats(58);
        train27.setSecondAcSeats(58);
        train27.setFirstAcSeats(29);
        trainRepository.save(train27);

        // Kolkata to Chennai
        Train train28 = new Train();
        train28.setTrainName("Coromandel Express");
        train28.setTrainNumber("12841");
        train28.setSource("Kolkata");
        train28.setDestination("Chennai");
        train28.setDepartureTime("14:40");
        train28.setArrivalTime("19:00");
        train28.setTotalSeats(560);
        train28.setGeneralPrice(680.0);
        train28.setSleeperPrice(1020.0);
        train28.setThirdAcPrice(1480.0);
        train28.setSecondAcPrice(2250.0);
        train28.setFirstAcPrice(3300.0);
        train28.setGeneralSeats(112);
        train28.setSleeperSeats(168);
        train28.setThirdAcSeats(112);
        train28.setSecondAcSeats(112);
        train28.setFirstAcSeats(56);
        trainRepository.save(train28);

        // Ahmedabad to Mumbai
        Train train29 = new Train();
        train29.setTrainName("Shatabdi Express");
        train29.setTrainNumber("12009");
        train29.setSource("Ahmedabad");
        train29.setDestination("Mumbai");
        train29.setDepartureTime("14:30");
        train29.setArrivalTime("21:00");
        train29.setTotalSeats(340);
        train29.setGeneralPrice(350.0);
        train29.setSleeperPrice(530.0);
        train29.setThirdAcPrice(760.0);
        train29.setSecondAcPrice(1100.0);
        train29.setFirstAcPrice(1600.0);
        train29.setGeneralSeats(68);
        train29.setSleeperSeats(102);
        train29.setThirdAcSeats(68);
        train29.setSecondAcSeats(68);
        train29.setFirstAcSeats(34);
        trainRepository.save(train29);

        // Mumbai to Ahmedabad
        Train train30 = new Train();
        train30.setTrainName("Shatabdi Express");
        train30.setTrainNumber("12010");
        train30.setSource("Mumbai");
        train30.setDestination("Ahmedabad");
        train30.setDepartureTime("06:25");
        train30.setArrivalTime("13:00");
        train30.setTotalSeats(340);
        train30.setGeneralPrice(350.0);
        train30.setSleeperPrice(530.0);
        train30.setThirdAcPrice(760.0);
        train30.setSecondAcPrice(1100.0);
        train30.setFirstAcPrice(1600.0);
        train30.setGeneralSeats(68);
        train30.setSleeperSeats(102);
        train30.setThirdAcSeats(68);
        train30.setSecondAcSeats(68);
        train30.setFirstAcSeats(34);
        trainRepository.save(train30);

        System.out.println("Data seeding completed successfully!");
        System.out.println("Total trains added: 30");
        System.out.println("Admin credentials: admin@railway.com / admin123");
        System.out.println("User credentials: john@example.com / password123");
    }
}