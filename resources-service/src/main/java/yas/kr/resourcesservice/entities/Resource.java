package yas.kr.resourcesservice.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yas.kr.resourcesservice.enums.ResourceType;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Resource.java

public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private ResourceType type;

    // getters and setters

    // constructors
}
