package com.tritech.demo.services.Utilities;


import com.tritech.demo.models.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(Booking booking) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("");
        message.setTo(booking.getUser().getEmail());
        message.setText("La prenotazione con titolo " + booking.getTitle() + ", con inizio: " + booking.getStartDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")) + ", e fine: " + booking.getEndDate().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm")) + " è stata confermata.");
        message.setSubject("Booking confirmed");


        mailSender.send(message);
    }


}
