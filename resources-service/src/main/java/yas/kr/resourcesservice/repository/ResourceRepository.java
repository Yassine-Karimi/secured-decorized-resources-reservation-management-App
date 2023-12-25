package yas.kr.resourcesservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yas.kr.resourcesservice.entities.Resource;

public interface ResourceRepository extends JpaRepository<Resource,Long> {
}
