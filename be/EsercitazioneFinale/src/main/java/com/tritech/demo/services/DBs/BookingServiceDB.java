package com.tritech.demo.services.DBs;

import com.tritech.demo.models.Booking;
import com.tritech.demo.models.Reservation;
import com.tritech.demo.repositories.BookingRepository;
import com.tritech.demo.services.BookingService;
import com.tritech.demo.services.Utilities.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class BookingServiceDB implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;


    @Autowired
    private EmailSenderService emailSenderService;




    @Override
    public List<Booking> getAllBookings() {
        return this.bookingRepository.findAll();
    }


    @Override
    public Boolean addBooking(Booking booking) {

        boolean valid;


        if(checkValidityDate(booking, "post")){
            this.bookingRepository.save(booking);
            emailSenderService.sendEmail(booking);
            valid = true;

        } else {
            valid = false;
        }

        return valid;
    }


    @Override
    public Boolean updateBooking(Long id, Booking booking) {

        boolean valid;

        Optional<Booking> bookingToUpdate = this.bookingRepository.findById(id);

        if (bookingToUpdate.isPresent()){

            if(checkValidityDate(booking, "update")) {

                Booking newBooking = new Booking();

                newBooking.setId(id);
                newBooking.setTitle(booking.getTitle());
                newBooking.setStartDate(booking.getStartDate());
                newBooking.setEndDate(booking.getEndDate());
                newBooking.setRoom(booking.getRoom());
                newBooking.setUser(booking.getUser());
                newBooking.setNumberOfParticipants(booking.getNumberOfParticipants());
                newBooking.setTechNecessities(booking.getTechNecessities());

                this.bookingRepository.save(newBooking);
                emailSenderService.sendEmail(booking);

                valid = true;

            } else {
                valid = false;
            }

        } else {
            valid = false;
        }

        return valid;
    }


    @Override
    public void removeBooking(Long id) {
        this.bookingRepository.deleteById(id);
    }



    @Override
    public List<Booking> getRoomBookings(Long id){
        return this.bookingRepository.findByRoomIdOrderById(id);
    }




    @Override
    public Booking getBookingById(Long id) {
        Optional<Booking> booking = this.bookingRepository.findById(id);

        return booking.orElse(null);

    }



    @Override
    public List<Booking> getRoomBookingsOrderByDate(Long id) {
        return this.bookingRepository.findByRoomIdOrderByStartDate(id);
    }



    public Boolean checkValidityDate(Booking booking, String type) {

        Boolean valid = false;

        LocalDateTime startDate = booking.getStartDate();
        LocalDateTime endDate = booking.getEndDate();

        final LocalDateTime newStartDate = startDate;

        List<Booking> roomBookings = this.bookingRepository.findByRoomIdOrderByStartDate(booking.getRoom().getId());
        List<Reservation> reservations = new ArrayList<>();


        for (Booking roomBooking : roomBookings) {
            if (Objects.equals(type, "post")){
                reservations.add(new Reservation(roomBooking.getStartDate(), roomBooking.getEndDate()));
            } else if (Objects.equals(type, "update")) {

                if (!Objects.equals(roomBooking.getId(), booking.getId())) {
                    reservations.add(new Reservation(roomBooking.getStartDate(), roomBooking.getEndDate()));
                }
            }
        }


        if(startDate.isBefore(endDate) && startDate.getDayOfMonth() == endDate.getDayOfMonth()){
            startDate = startDate.plusSeconds(59);

                for (Reservation reservation : reservations) {
                    if ((startDate.isAfter(reservation.getStartDate()) || startDate.isEqual(reservation.getStartDate())) && (endDate.isBefore(reservation.getEndDate()) || endDate.isEqual(reservation.getEndDate()))) {
                        return valid;
                    } else if (startDate.isBefore(reservation.getStartDate()) && endDate.isAfter(reservation.getStartDate())) {
                        return valid;
                    } else if (startDate.isBefore(reservation.getEndDate()) && endDate.isAfter(reservation.getEndDate())) {
                        return valid;
                    }
                }


            valid = true;
            return valid;
        }

        return valid;
    }





}
