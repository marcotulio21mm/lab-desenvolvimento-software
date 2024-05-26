package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.demo.Controller,com.example.demo.service")
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}
