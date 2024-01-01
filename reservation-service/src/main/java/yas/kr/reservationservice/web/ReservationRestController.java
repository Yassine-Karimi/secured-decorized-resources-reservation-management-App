package yas.kr.reservationservice.web;

// ReservationRestController.java

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.services.ReservationService;
import yas.kr.reservationservice.services.ReservationServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/reservations")
public class ReservationRestController {
    private final ReservationServiceImpl reservationService;


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

    @GetMapping("/fullReservationsPages")
    public Page<ReservationDTOResponse> getPageReservations(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ReservationDTOResponse> reservationPage = reservationService.getPageReservations(pageable);
        return reservationPage;
    }
}
