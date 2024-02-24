package com.tritech.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notosale")
public class Room {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    @ManyToOne
    @JoinColumn(name = "site", referencedColumnName = "id")
    private Site site;

    public Room(String name, Site site) {
        this.name = name;
        this.site = site;
    }
}
