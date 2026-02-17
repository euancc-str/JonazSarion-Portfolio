package com.example.webportfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class RatingController {
    @Autowired
    private UserService userService;
    @PostMapping("/rating")
    public ResponseEntity<UserRating> recordRating (@AuthenticationPrincipal OAuth2User principal, @RequestBody UserRating userRating){
        if (principal == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        populateUserRating(principal,userRating);
        userRating.setId(null);
        userRating.setStatus(0);
        UserRating savedRating = userService.saveUserRating(userRating);
        return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
    }

    @GetMapping("/allRating")
    public ResponseEntity<List<UserRating>> getAllRating(){
        List<UserRating> listOfRating = userService.findAllUser();
        return new ResponseEntity<>(listOfRating, HttpStatus.OK);
    }

    @PutMapping("/rating/{id}")
    public ResponseEntity<UserRating> updateById(
            @PathVariable("id") Integer id,
            @RequestBody Map<String,Integer> payload) {
       int displayedStatus = payload.get("status");
       UserRating userRating = userService.updateUserToBeDisplayed(id, displayedStatus);
       return new ResponseEntity<>(userRating, HttpStatus.OK);
    }

    @GetMapping("/displayed/{status}")
    public ResponseEntity<List<UserRating>> displayedRatings(
            @PathVariable("status") int status){
        List<UserRating> userRating = userService.displayedRatings(status);
        return new ResponseEntity<>(userRating,HttpStatus.OK);
    }


    private void populateUserRating(OAuth2User principal, UserRating userRating) {
        String name = principal.getAttribute("name");
        String email = principal.getAttribute("email");
        String githubLogin = principal.getAttribute("login");
        if(email == null && githubLogin != null) {
            email = githubLogin + "@github.com";
        }
        if (name == null && githubLogin != null) {
            name = githubLogin;
        }
        userRating.setEmail(email != null ? email : "secretEmail@gmail.com");
        userRating.setName(name != null ? name : "NoNamePerson");
        String picture = principal.getAttribute("picture"); // Google
        String avatar = principal.getAttribute("avatar_url"); // GitHub

        if (picture != null) {
            userRating.setProfilePicture(picture);
        } else if (avatar != null) {
            userRating.setProfilePicture(avatar);
        } else {
            userRating.setProfilePicture("https://cdn-icons-png.flaticon.com/512/149/149071.png");
        }
    }

}
