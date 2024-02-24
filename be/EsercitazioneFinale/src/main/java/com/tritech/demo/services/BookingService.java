package com.tritech.demo.services;

import com.tritech.demo.models.Booking;
import java.util.List;


public interface BookingService {

    List<Booking> getAllBookings();

    Boolean addBooking(Booking booking);

    Boolean updateBooking(Long id, Booking booking);

    void removeBooking(Long id);

    List<Booking> getRoomBookings(Long id);

    Booking getBookingById(Long id);

    List<Booking> getRoomBookingsOrderByDate(Long id);

    Boolean checkValidityDate(Booking booking, String type);


}
