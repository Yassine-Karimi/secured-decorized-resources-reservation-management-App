package yas.kr.resourcesservice.service;
// ResourceService.java

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import yas.kr.resourcesservice.dtos.ResourceDTORequest;
import yas.kr.resourcesservice.dtos.ResourceDTOResponse;
import yas.kr.resourcesservice.entities.Resource;
import yas.kr.resourcesservice.mappers.ResourceMapper;
import yas.kr.resourcesservice.repository.ResourceRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResourceServiceImpl implements ResourcesService {

    private final ResourceRepository resourceRepository;
    private final ResourceMapper resourceMapper;

    @Autowired
    public ResourceServiceImpl(ResourceRepository resourceRepository, ResourceMapper resourceMapper) {
        this.resourceRepository = resourceRepository;
        this.resourceMapper = resourceMapper;
    }

    public List<ResourceDTOResponse> getAllResources() {
        List<Resource> resources = resourceRepository.findAll();
        return resources.stream()
                .map(resourceMapper::resourceToResourceDTOResponse)
                .collect(Collectors.toList());
    }

    public ResourceDTOResponse getResourceById(Long id) {
        Resource resource = resourceRepository.findById(id).orElse(null);
        return (resource != null) ? resourceMapper.resourceToResourceDTOResponse(resource) : null;
    }

    public ResourceDTOResponse createResource(ResourceDTORequest resourceDTORequest) {
        Resource resource = resourceMapper.resourceDTORequestToResource(resourceDTORequest);
        resource = resourceRepository.save(resource);
        return resourceMapper.resourceToResourceDTOResponse(resource);
    }

    public ResourceDTOResponse updateResource(Long id, ResourceDTORequest updatedResourceDTORequest) {
        Resource existingResource = resourceRepository.findById(id).orElse(null);

        if (existingResource != null) {
            Resource updatedResource = resourceMapper.resourceDTORequestToResource(updatedResourceDTORequest);
            updatedResource.setId(existingResource.getId());
            updatedResource = resourceRepository.save(updatedResource);

            return resourceMapper.resourceToResourceDTOResponse(updatedResource);
        } else {
            return null;
        }
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }

    public Page<ResourceDTOResponse> getPageResources(Pageable pageable) {
        Page<Resource> resourcesPage = resourceRepository.findAll(pageable);
        return resourcesPage.map(resourceMapper::resourceToResourceDTOResponse);
    }
}
