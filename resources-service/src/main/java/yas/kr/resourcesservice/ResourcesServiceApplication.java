package yas.kr.resourcesservice;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import yas.kr.resourcesservice.entities.Resource;
import yas.kr.resourcesservice.enums.ResourceType;
import yas.kr.resourcesservice.repository.ResourceRepository;

import java.util.List;

@SpringBootApplication
public class ResourcesServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResourcesServiceApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(ResourceRepository resourceRepository) {
		return args -> {

			List<Resource> resourceList = List.of(
					Resource.builder()
							.name("Resource 1")
							.type(ResourceType.MATERIEL_INFO)
							.build(),
					Resource.builder()
							.name("Resource 2")
							.type(ResourceType.MATERIEL_AUDIO_VISUEL)
							.build()
			);
			resourceRepository.saveAll(resourceList);
		};
	}
}
