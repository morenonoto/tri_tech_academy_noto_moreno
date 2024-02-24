package com.tritech.demo.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notosedi")
public class Site {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String address;


    public Site(String name, String address) {
        this.name = name;
        this.address = address;
    }
}
