package com.tritech.demo.repositories;

import com.tritech.demo.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {



    List<Room> findBySiteIdOrderById(Long id);



}
