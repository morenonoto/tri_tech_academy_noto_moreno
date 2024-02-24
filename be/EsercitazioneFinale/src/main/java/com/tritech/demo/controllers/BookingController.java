package com.tritech.demo.controllers;

import com.opencsv.CSVWriter;
import com.tritech.demo.models.Booking;
import com.tritech.demo.services.DBs.BookingServiceDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {

    @Autowired
    private BookingServiceDB bookingServiceDB;



    @GetMapping(value = "/bookings")
    public List<Booking> getAllBookings(){
        return this.bookingServiceDB.getAllBookings();
    }



    @PostMapping(value = "/bookings")
    public boolean addBooking(@RequestBody Booking booking){
        return this.bookingServiceDB.addBooking(booking);
    }



    @PutMapping(value = "/bookings/{id}")
    public Boolean updateBooking(@PathVariable Long id, @RequestBody Booking booking){
        return this.bookingServiceDB.updateBooking(id, booking);
    }



    @DeleteMapping(value = "/deleteBooking")
    public void removeBooking(@RequestParam Long id){
        this.bookingServiceDB.removeBooking(id);
    }



    @GetMapping(value = "/roomBookings")
    public List<Booking> getRoomBookings(@RequestParam Long id) {
        return this.bookingServiceDB.getRoomBookings(id);
    }




    @GetMapping(value = "/bookingById")
    public Booking getBookingById(@RequestParam Long id) {
        return this.bookingServiceDB.getBookingById(id);
    }



    @GetMapping(value = "/bookingByRoomIdOrderByDate")
    public List<Booking> getRoomBookingsOrderByDate(@RequestParam Long id) {
        return this.bookingServiceDB.getRoomBookingsOrderByDate(id);
    }





    @GetMapping("/csvexport")
    public void exportCSV(HttpServletResponse response) throws IOException {

        String filename = "BookingReport.csv";

        response.setContentType("text/csv");

        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");

        try (
                Writer writer = new OutputStreamWriter(response.getOutputStream());
                CSVWriter csvWriter = new CSVWriter(writer)
        ) {
            String[] headers = {"ID", "Title", "Start Date", "End Date", "Room", "User", "Number of Participants", "Technical Necessities"};
            csvWriter.writeNext(headers);

            List<Booking> bookings = bookingServiceDB.getAllBookings();
            for (Booking booking : bookings) {
                String techNecessities = String.join("; ", booking.getTechNecessities());

                String[] bookingData = {
                        String.valueOf(booking.getId()),
                        booking.getTitle(),
                        booking.getStartDate().toString(),
                        booking.getEndDate().toString(),
                        String.valueOf(booking.getRoom().getId()),
                        String.valueOf(booking.getUser().getId()),
                        String.valueOf(booking.getNumberOfParticipants()),
                        techNecessities
                };

                csvWriter.writeNext(bookingData);
            }
        } catch (Exception e) {

            throw new IOException("Failed to export bookings to CSV", e);
        }
    }



}
