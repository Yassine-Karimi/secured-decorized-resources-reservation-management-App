package yas.kr.reservationservice.mappers;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import yas.kr.reservationservice.dtos.PersonRequestDto;
import yas.kr.reservationservice.dtos.PersonResponseDto;
import yas.kr.reservationservice.entities.Person;
import yas.kr.reservationservice.entities.Reservation;
import yas.kr.reservationservice.dtos.ReservationDTORequest;
import yas.kr.reservationservice.dtos.ReservationDTOResponse;
import yas.kr.reservationservice.model.Resource;

@Service
public class PersonMapper {

    private ModelMapper modelMapper = new ModelMapper();

    public Person personDTORequestToPerson(PersonRequestDto dto) {
        return modelMapper.map(dto, Person.class);
    }

    public PersonResponseDto personToPersonDTOResponse(Person entity) {
        return modelMapper.map(entity, PersonResponseDto.class);
    }


}
