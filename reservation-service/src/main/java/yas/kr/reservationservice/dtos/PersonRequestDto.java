package yas.kr.reservationservice.dtos;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonRequestDto {

    private String name;
    private String email;
    private String role;

    // Getters and setters
}
