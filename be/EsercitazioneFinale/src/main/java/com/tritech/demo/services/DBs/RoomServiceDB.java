package com.tritech.demo.services.DBs;

import com.tritech.demo.models.Room;
import com.tritech.demo.repositories.RoomRepository;
import com.tritech.demo.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceDB implements RoomService{

    @Autowired
    private RoomRepository roomRepository;




    @Override
    public List<Room> getAllRooms() {
        return this.roomRepository.findAll();
    }


    @Override
    public void addRoom(Room room) {
        this.roomRepository.save(room);
    }


    @Override
    public void updateRoom(Long id, Room room) {
        Optional<Room> roomToUpdate = this.roomRepository.findById(id);

        if (roomToUpdate.isPresent()){

            Room newRoom = new Room();

            newRoom.setId(id);
            newRoom.setName(room.getName());
            newRoom.setSite(room.getSite());

            this.roomRepository.save(newRoom);
        }
    }


    @Override
    public void removeRoom(Long id) {
        this.roomRepository.deleteById(id);
    }


    @Override
    public List<Room> getSiteRooms(Long id){
        return this.roomRepository.findBySiteIdOrderById(id);
    }


    @Override
    public Room getRoomById(Long id) {
        Optional<Room> room = this.roomRepository.findById(id);
        return room.orElse(null);
    }
}
