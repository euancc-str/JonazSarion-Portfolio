package com.example.webportfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EmailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @PostMapping("/api/send-email")
    public String sendEmail(@RequestBody Map<String, String> payload,
                            @AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) return "Error: You must be logged in to send messages.";


        String userEmail = principal.getAttribute("email");
        String userName = principal.getAttribute("name");


        String messageBody = payload.get("message");

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("jonazesarion03012005@gmail.com");
        message.setTo("jonazesarion03012005@gmail.com");

        if(userName == null) {
            userEmail = payload.get("email");
            userName = payload.get("name");
        }
        message.setSubject("New Portfolio Message from " + userName);
        message.setText("From user: " + userName + "\n" +
                "Email: " + userEmail + "\n" +
                "\nMessage:\n" + messageBody);

        javaMailSender.send(message);
        return "Success: Email sent!";
    }
}