package yas.kr.resourcesservice.dtos;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import yas.kr.resourcesservice.enums.ResourceType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResourceDTORequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private ResourceType type;


    // getters and setters

    // Vous pouvez ajouter des validations ici si nécessaire
}
