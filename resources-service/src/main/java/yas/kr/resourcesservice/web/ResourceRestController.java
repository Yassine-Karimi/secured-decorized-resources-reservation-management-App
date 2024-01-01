package yas.kr.resourcesservice.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import yas.kr.resourcesservice.dtos.ResourceDTORequest;
import yas.kr.resourcesservice.dtos.ResourceDTOResponse;
import yas.kr.resourcesservice.service.ResourceServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/resources")
public class ResourceRestController {

    private final ResourceServiceImpl resourceServiceImpl;

    @Autowired
    public ResourceRestController(ResourceServiceImpl resourceServiceImpl) {
        this.resourceServiceImpl = resourceServiceImpl;
    }

    @GetMapping
    public List<ResourceDTOResponse> getAllResources() {
        return resourceServiceImpl.getAllResources();
    }

    @GetMapping("/{id}")
    public ResourceDTOResponse getResourceById(@PathVariable Long id) {
        return resourceServiceImpl.getResourceById(id);
    }

    @PostMapping
    public ResourceDTOResponse createResource(@RequestBody ResourceDTORequest resourceDTORequest) {
        return resourceServiceImpl.createResource(resourceDTORequest);
    }

    @PutMapping("/{id}")
    public ResourceDTOResponse updateResource(@PathVariable Long id, @RequestBody ResourceDTORequest updatedResourceDTORequest) {
        return resourceServiceImpl.updateResource(id, updatedResourceDTORequest);
    }

    @DeleteMapping("/{id}")
    public void deleteResource(@PathVariable Long id) {
        resourceServiceImpl.deleteResource(id);
    }
    @GetMapping("/fullResourcesPages")
    public Page<ResourceDTOResponse> getPageResources(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ResourceDTOResponse> page1 = resourceServiceImpl.getPageResources(pageable);
        return page1;
    }
}