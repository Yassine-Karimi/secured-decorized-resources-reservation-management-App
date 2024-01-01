package yas.kr.reservationservice.entities;
// Reservation.java


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import yas.kr.reservationservice.model.Resource;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String context;
    private LocalDate date;
    private int duration;
    private Long resourceId;
    @ManyToOne
    private Person person;
   @Transient
    private Resource ressource;



}
