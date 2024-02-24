package com.tritech.demo.repositories;

import com.tritech.demo.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRoomIdOrderById(Long id);

    List<Booking> findByRoomIdOrderByStartDate(Long id);

    Optional<Booking> findById(Long Id);

}
