package com.zonanquietud.backend;

import org.springframework.boot.SpringApplication;

public class TestZonasQuietudBackendApplication {

	public static void main(String[] args) {
		SpringApplication.from(ZonasQuietudBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
