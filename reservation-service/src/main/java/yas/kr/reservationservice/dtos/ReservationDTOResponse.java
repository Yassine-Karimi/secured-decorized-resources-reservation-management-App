package yas.kr.reservationservice.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDTOResponse {

    private Long id;
    private String name;
    private String context;
    private LocalDate date;
    private int duration;
    private Long resourceId;

    // Getters et setters
}