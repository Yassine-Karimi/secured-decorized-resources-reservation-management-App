package yas.kr.reservationservice.services;

// ReservationService.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yas.kr.reservationservice.entities.Reservation;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.exceptions.ReservationNotFoundException;
import yas.kr.reservationservice.mappers.ReservationMapper;
import yas.kr.reservationservice.repository.ReservationRepository;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, ReservationMapper reservationMapper) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
    }

    public List<ReservationDTOResponse> getAllReservations() {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream()
                .map(reservationMapper::reservationToReservationDTOResponse)
                .collect(Collectors.toList());
    }

    public ReservationDTOResponse getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));
        return reservationMapper.reservationToReservationDTOResponse(reservation);
    }

    public ReservationDTOResponse createReservation(ReservationDTORequest reservationDTORequest) {
        Reservation reservation = reservationMapper.reservationDTORequestToReservation(reservationDTORequest);
        reservation = reservationRepository.save(reservation);
        return reservationMapper.reservationToReservationDTOResponse(reservation);
    }

    public ReservationDTOResponse updateReservation(Long id, ReservationDTORequest updatedReservationDTORequest) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));

        Reservation updatedReservation = reservationMapper.reservationDTORequestToReservation(updatedReservationDTORequest);
        updatedReservation.setId(existingReservation.getId());
        updatedReservation = reservationRepository.save(updatedReservation);

        return reservationMapper.reservationToReservationDTOResponse(updatedReservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
