package yas.kr.reservationservice.services;

import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;

import java.util.List;

public interface ReservationService{
    List<ReservationDTOResponse> getAllReservations();

    ReservationDTOResponse getReservationById(Long id);

    ReservationDTOResponse createReservation(ReservationDTORequest reservationDTORequest);

    ReservationDTOResponse updateReservation(Long id, ReservationDTORequest updatedReservationDTORequest);

    void deleteReservation(Long id);
}
