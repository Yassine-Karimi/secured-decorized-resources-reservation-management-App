package yas.kr.reservationservice.clients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import yas.kr.reservationservice.model.Resource;

@FeignClient(name = "resources-service")  // Remplacez "resources-service" par le nom réel du service de ressources
public interface ResourceFeignClient {

    @GetMapping("/resources/{id}")
    Resource getResourceById(@PathVariable Long id);
}