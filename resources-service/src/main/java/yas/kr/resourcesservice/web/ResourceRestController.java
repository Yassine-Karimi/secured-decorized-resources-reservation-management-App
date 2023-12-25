package yas.kr.resourcesservice.web;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yas.kr.resourcesservice.dtos.ResourceDTORequest;
import yas.kr.resourcesservice.dtos.ResourceDTOResponse;
import yas.kr.resourcesservice.service.ResourceService;

import java.util.List;

@RestController
@RequestMapping("/resources")
public class ResourceRestController {

    private final ResourceService resourceService;

    @Autowired
    public ResourceRestController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public List<ResourceDTOResponse> getAllResources() {
        return resourceService.getAllResources();
    }

    @GetMapping("/{id}")
    public ResourceDTOResponse getResourceById(@PathVariable Long id) {
        return resourceService.getResourceById(id);
    }

    @PostMapping
    public ResourceDTOResponse createResource(@RequestBody ResourceDTORequest resourceDTORequest) {
        return resourceService.createResource(resourceDTORequest);
    }

    @PutMapping("/{id}")
    public ResourceDTOResponse updateResource(@PathVariable Long id, @RequestBody ResourceDTORequest updatedResourceDTORequest) {
        return resourceService.updateResource(id, updatedResourceDTORequest);
    }

    @DeleteMapping("/{id}")
    public void deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
    }
}