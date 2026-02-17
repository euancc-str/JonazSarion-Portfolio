package com.example.webportfolio;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class ViewController {

    @GetMapping("/api/user-info")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> userData = new HashMap<>();

        if (principal != null) {
            populateFields(principal,userData);
        } else {
            userData.put("error", "User not logged in");
        }
        return userData;
    }
    private void populateFields(OAuth2User principal, Map<String,Object> userData){

        String name = principal.getAttribute("name");
        String email = principal.getAttribute("email");
        String githubLogin = principal.getAttribute("login");

        if (name == null && githubLogin != null) {
            name = githubLogin;
        }
        if (email == null && githubLogin != null) {
            email = githubLogin + "@github.com";
        }

        String photo = principal.getAttribute("picture"); //google photo
        if (photo == null) {
            photo = principal.getAttribute("avatar_url"); // gh photo
        }
        userData.put("name", name);
        userData.put("email", email);
        userData.put("photo", photo);
    }

}