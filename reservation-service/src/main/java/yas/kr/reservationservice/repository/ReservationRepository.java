package yas.kr.reservationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yas.kr.reservationservice.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}