package com.tritech.demo.services;

import com.tritech.demo.models.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    void addUser(User user);

    void updateUser(Long id, User user);

    void removeUser(Long id);

    Boolean checkIdentity(String email, String password);

    User findByEmail(String email);
}
