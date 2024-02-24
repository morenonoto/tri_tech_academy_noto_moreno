package com.tritech.demo.services;

import com.tritech.demo.models.Room;

import java.util.List;

public interface RoomService {

    List<Room> getAllRooms();

    void addRoom(Room room);

    void updateRoom(Long id, Room room);

    void removeRoom(Long id);

    List<Room> getSiteRooms(Long id);

    Room getRoomById(Long id);

}
