package yas.kr.reservationservice.services;

// ReservationService.java

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import yas.kr.reservationservice.clients.ResourceFeignClient;
import yas.kr.reservationservice.entities.Reservation;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.exceptions.ReservationNotFoundException;
import yas.kr.reservationservice.mappers.ReservationMapper;
import yas.kr.reservationservice.model.Resource;
import yas.kr.reservationservice.repository.ReservationRepository;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService{

    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private  ResourceFeignClient resourceFeignClient;



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

    public Page<ReservationDTOResponse> getPageReservations(Pageable pageable) {
        Page<Reservation> reservationPage = reservationRepository.findAll(pageable);
        List<ReservationDTOResponse> reservationDTOs = reservationPage.getContent()
                .stream()
                .map(this::mapReservationToDTO)
                .collect(Collectors.toList());

        return new PageImpl<>(reservationDTOs, pageable, reservationPage.getTotalElements());
    }

    private ReservationDTOResponse mapReservationToDTO(Reservation reservation) {
        Resource resource = resourceFeignClient.getResourceById(reservation.getResourceId());
        reservation.setRessource(resource);
        return reservationMapper.reservationToReservationDTOResponse(reservation);
    }
}
