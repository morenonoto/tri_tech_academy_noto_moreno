package com.tritech.demo.controllers;

import com.tritech.demo.models.User;
import com.tritech.demo.services.DBs.UserServiceDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserServiceDB userServiceDB;



    @GetMapping(value = "/users")
    public List<User> getAllUsers(){
        return this.userServiceDB.getAllUsers();
    }



    @PostMapping(value = "/users")
    public void addUser(@RequestBody User user){
        this.userServiceDB.addUser(user);
    }



    @PutMapping(value = "/users/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User user){
        this.userServiceDB.updateUser(id, user);
    }



    @DeleteMapping(value = "/users/{id}")
    public void removeUser(@PathVariable Long id){
        this.userServiceDB.removeUser(id);
    }



    @GetMapping(value = "/checkUser")
    public boolean checkUser(@RequestParam String email, @RequestParam String password) {
        return this.userServiceDB.checkIdentity(email, password);
    }


    @GetMapping(value = "/userByEmail")
    public User findByEmail(@RequestParam String email) {
       return this.userServiceDB.findByEmail(email);
    }

}
