package com.tritech.demo.repositories;

import com.tritech.demo.models.Site;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteRepository extends JpaRepository<Site, Long> {
}
