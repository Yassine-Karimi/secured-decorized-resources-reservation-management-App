package yas.kr.reservationservice.web;


import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yas.kr.reservationservice.dtos.PersonRequestDto;
import yas.kr.reservationservice.dtos.PersonResponseDto;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.services.PersonServiceImpl;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/persons")
@AllArgsConstructor
public class PersonRestController {


        private final PersonServiceImpl personService;


        @GetMapping
        public ResponseEntity<List<PersonResponseDto>> getAllPersons() {
            List<PersonResponseDto> persons = personService.getAllPersons();
            return new ResponseEntity<>(persons, HttpStatus.OK);
        }

        @GetMapping("/{id}")
        public ResponseEntity<PersonResponseDto> getPersonById(@PathVariable Long id) {
            Optional<PersonResponseDto> personOptional = personService.getPersonById(id);
            return personOptional
                    .map(person -> new ResponseEntity<>(person, HttpStatus.OK))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }

        @PostMapping
        public ResponseEntity<PersonResponseDto> createPerson(@RequestBody PersonRequestDto personRequestDto) {
            PersonResponseDto createdPerson = personService.createPerson(personRequestDto);
            return new ResponseEntity<>(createdPerson, HttpStatus.CREATED);
        }

    @PutMapping("/{id}")
    public PersonResponseDto updatePerson(@PathVariable Long id, @RequestBody PersonRequestDto updatedPersonDTORequest) {
        return personService.updatePerson(id, updatedPersonDTORequest);
    }

    @DeleteMapping("/{id}")
    public void deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
    }

    @GetMapping("/fullPersonsPages")
    public Page<PersonResponseDto> getPagePersons(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<PersonResponseDto> page1 = personService.getPagePerson(pageable);
        return page1;
    }


}
