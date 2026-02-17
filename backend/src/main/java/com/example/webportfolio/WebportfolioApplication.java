package com.example.webportfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class WebportfolioApplication {

	public static void main(String[] args) {
		SpringApplication.run(WebportfolioApplication.class, args);
	}

}
