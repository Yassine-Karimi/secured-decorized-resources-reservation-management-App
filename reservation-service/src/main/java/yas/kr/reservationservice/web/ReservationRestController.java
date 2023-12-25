package yas.kr.reservationservice.web;

// ReservationRestController.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.services.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationRestController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationRestController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<ReservationDTOResponse> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ReservationDTOResponse getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @PostMapping
    public ReservationDTOResponse createReservation(@RequestBody ReservationDTORequest reservationDTORequest) {
        return reservationService.createReservation(reservationDTORequest);
    }

    @PutMapping("/{id}")
    public ReservationDTOResponse updateReservation(@PathVariable Long id, @RequestBody ReservationDTORequest updatedReservationDTORequest) {
        return reservationService.updateReservation(id, updatedReservationDTORequest);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }
}
