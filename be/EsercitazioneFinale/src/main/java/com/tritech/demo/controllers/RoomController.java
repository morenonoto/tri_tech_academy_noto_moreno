package com.tritech.demo.controllers;

import com.tritech.demo.models.Room;
import com.tritech.demo.services.DBs.RoomServiceDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RoomController {


    @Autowired
    private RoomServiceDB roomServiceDB;



    @GetMapping(value = "/rooms")
    public List<Room> getAllRooms(){
        return this.roomServiceDB.getAllRooms();
    }



    @PostMapping(value = "/rooms")
    public void addRoom(@RequestBody Room room){
        this.roomServiceDB.addRoom(room);
    }



    @PutMapping(value = "/rooms/{id}")
    public void updateRoom(@PathVariable Long id, @RequestBody Room room){
        this.roomServiceDB.updateRoom(id, room);
    }



    @DeleteMapping(value = "/rooms/{id}")
    public void removeRoom(@PathVariable Long id){
        this.roomServiceDB.removeRoom(id);
    }



    @GetMapping(value = "/siteRooms")
    public List<Room> getSiteRooms(@RequestParam("id") Long id){
        return this.roomServiceDB.getSiteRooms(id);
    }



    @GetMapping(value = "/roomById")
    public Room getRoomById(@RequestParam Long id) {
        return this.roomServiceDB.getRoomById(id);
    }
}
