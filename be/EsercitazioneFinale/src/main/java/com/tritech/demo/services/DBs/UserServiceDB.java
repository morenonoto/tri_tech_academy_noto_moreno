package com.tritech.demo.services.DBs;

import com.tritech.demo.models.User;
import com.tritech.demo.repositories.UserRepository;
import com.tritech.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceDB implements UserService {

    @Autowired
    private UserRepository userRepository;




    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }


    @Override
    public void addUser(User user) {
        this.userRepository.save(user);
    }


    @Override
    public void updateUser(Long id, User user) {

        Optional<User> userToUpdate = this.userRepository.findById(id);

        if (userToUpdate.isPresent()){

            User newUser = new User();

            newUser.setId(id);
            newUser.setName(user.getName());
            newUser.setEmail(user.getEmail());
            newUser.setRole(user.getRole());
            newUser.setPassword(user.getPassword());

            this.userRepository.save(newUser);
        }
    }


    @Override
    public void removeUser(Long id) {
        this.userRepository.deleteById(id);
    }





    public Boolean checkIdentity(String email, String password){

        Optional<User> user = this.userRepository.findByEmail(email);

        if (user.isPresent()) {
            if (Objects.equals(user.get().getPassword(), password)) {
                return true;
            }
        }

        return false;
    }


    public User findByEmail(String email) {
        Optional<User> user = this.userRepository.findByEmail(email);

        return user.orElse(null);

    }
}
