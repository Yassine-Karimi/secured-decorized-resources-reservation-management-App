package yas.kr.reservationservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yas.kr.reservationservice.entities.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
}