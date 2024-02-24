package com.tritech.demo.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
public class Reservation {
    LocalDateTime startDate;
    LocalDateTime endDate;
}
