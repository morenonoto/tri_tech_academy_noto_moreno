package com.tritech.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notoprenotazioni")
public class Booking {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private LocalDateTime startDate;
    private LocalDateTime endDate;


    @ManyToOne
    @JoinColumn(name = "room", referencedColumnName = "id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private Long numberOfParticipants;
    private String techNecessities;


    public Booking(String title, LocalDateTime startDate, LocalDateTime endDate, Room room, User user, Long numberOfParticipants, String techNecessities) {
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.room = room;
        this.user = user;
        this.numberOfParticipants = numberOfParticipants;
        this.techNecessities = techNecessities;
    }
}
