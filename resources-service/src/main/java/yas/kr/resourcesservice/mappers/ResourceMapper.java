package yas.kr.resourcesservice.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import yas.kr.resourcesservice.dtos.ResourceDTORequest;
import yas.kr.resourcesservice.dtos.ResourceDTOResponse;
import yas.kr.resourcesservice.entities.Resource;

@Service
public class ResourceMapper {

    private ModelMapper modelMapper = new ModelMapper();

    public Resource resourceDTORequestToResource(ResourceDTORequest resourceDTORequest) {
        return modelMapper.map(resourceDTORequest, Resource.class);
    }

    public ResourceDTOResponse resourceToResourceDTOResponse(Resource resource) {
        return modelMapper.map(resource, ResourceDTOResponse.class);
    }
}