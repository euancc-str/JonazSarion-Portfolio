package com.example.webportfolio;

import com.example.webportfolio.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserRating saveUserRating(UserRating user) {
        return userRepository.save(user);
    };

    public Optional<UserRating> findUserById(int userId){
        return userRepository.findById(userId);
    }

    public List<UserRating> findAllUser(){
        return userRepository.findAll();
    }

    public UserRating updateUserToBeDisplayed(int id, int displayedStatus) {
        UserRating rating = userRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Rating with ID: " + id + " not found")
        );
        rating.setStatus(displayedStatus);
        return userRepository.save(rating);
    }

    public List<UserRating> displayedRatings(int displayed){
        return userRepository.dataToBeDisplayed(displayed);
    }
}
