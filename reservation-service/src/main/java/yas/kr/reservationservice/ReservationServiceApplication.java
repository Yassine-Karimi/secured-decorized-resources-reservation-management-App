package yas.kr.reservationservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import yas.kr.reservationservice.clients.ResourceFeignClient;
import yas.kr.reservationservice.entities.Reservation;
import yas.kr.reservationservice.model.Resource;
import yas.kr.reservationservice.model.ResourceType;
import yas.kr.reservationservice.repository.ReservationRepository;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
@EnableFeignClients(basePackages = "yas.kr.reservationservice.clients")

public class ReservationServiceApplication {


	private final ResourceFeignClient resourceFeignClient;
	private final ReservationRepository reservationRepository;

	public ReservationServiceApplication(ResourceFeignClient resourceFeignClient, ReservationRepository reservationRepository) {
		this.resourceFeignClient = resourceFeignClient;
		this.reservationRepository = reservationRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(ReservationServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner() {
		return args -> {
			// Récupérer la liste des ressources en utilisant Feign
			List<Resource> resourceList = List.of(
					resourceFeignClient.getResourceById(1L),
					resourceFeignClient.getResourceById(2L)
			);
			for (Resource resource : resourceList) {
				System.out.println("Resource ID: " + resource.getId());
				System.out.println("Resource Name: " + resource.getName());
				System.out.println("Resource Type: " + resource.getType());
				System.out.println("------------");
			}

			// Remplir la base de données avec des réservations
			List<Reservation> reservationList = List.of(
					Reservation.builder()
							.name("Reservation 1")
							.context("Meeting")
							.date(LocalDate.now())
							.duration(2)
							.resourceId(1L)
							.build(),
					Reservation.builder()
							.name("Reservation 2")
							.context("Presentation")
							.date(LocalDate.now().plusDays(1))
							.duration(3)
							.resourceId(1L)
							.build()
			);
			reservationRepository.saveAll(reservationList);
		};

	}
}
