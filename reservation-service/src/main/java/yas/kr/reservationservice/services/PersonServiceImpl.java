package yas.kr.reservationservice.services;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import yas.kr.reservationservice.dtos.PersonRequestDto;
import yas.kr.reservationservice.dtos.PersonResponseDto;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.entities.Person;
import yas.kr.reservationservice.entities.Reservation;
import yas.kr.reservationservice.exceptions.ReservationNotFoundException;
import yas.kr.reservationservice.mappers.PersonMapper;
import yas.kr.reservationservice.repository.PersonRepository;
import yas.kr.reservationservice.services.PersonService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PersonServiceImpl implements PersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper;


    public List<PersonResponseDto> getAllPersons() {
        List<Person> persons = personRepository.findAll();
        return persons.stream()
                .map(personMapper::personToPersonDTOResponse)
                .collect(Collectors.toList());
    }

    public Optional<PersonResponseDto> getPersonById(Long id) {
        Optional<Person> personOptional = personRepository.findById(id);
        return personOptional.map(personMapper::personToPersonDTOResponse);
    }

    public PersonResponseDto createPerson(PersonRequestDto personRequestDto) {
        Person person = personMapper.personDTORequestToPerson(personRequestDto);
        Person savedPerson = personRepository.save(person);
        return personMapper.personToPersonDTOResponse(savedPerson);
    }
    public PersonResponseDto updatePerson(Long id, PersonRequestDto updatedDTORequest) {
        Person existingPerson = personRepository.findById(id)
                .orElseThrow(() -> new ReservationNotFoundException(id));

        Person updatedPerson = personMapper.personDTORequestToPerson(updatedDTORequest);
        updatedPerson.setId(existingPerson.getId());
        updatedPerson =personRepository.save(updatedPerson);

        return personMapper.personToPersonDTOResponse(updatedPerson);
    }
    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }

    public Page<PersonResponseDto> getPagePerson(Pageable pageable) {
        Page<Person> personPage = personRepository.findAll(pageable);
        return personPage.map(personMapper::personToPersonDTOResponse);
    }

    // Add other CRUD operations

}
