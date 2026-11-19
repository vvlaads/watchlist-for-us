package com.watchlist.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		var context = SpringApplication.run(BackendApplication.class, args);
		Environment env = context.getEnvironment();

		System.out.println("DB URL: " + env.getProperty("spring.datasource.url"));
		System.out.println("DB USER: " + env.getProperty("spring.datasource.username"));
	}
}