package yas.kr.reservationservice.mappers;

// ReservationMapper.java

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import yas.kr.reservationservice.entities.Reservation;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.model.Resource;

@Service
public class ReservationMapper {

    private ModelMapper modelMapper = new ModelMapper();

    public Reservation reservationDTORequestToReservation(ReservationDTORequest dto) {
        return modelMapper.map(dto, Reservation.class);
    }

    public ReservationDTOResponse reservationToReservationDTOResponse(Reservation entity) {
        return modelMapper.map(entity, ReservationDTOResponse.class);
    }


}
