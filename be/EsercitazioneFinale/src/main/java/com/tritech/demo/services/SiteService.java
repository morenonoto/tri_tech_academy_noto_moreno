package com.tritech.demo.services;

import com.tritech.demo.models.Site;

import java.util.List;

public interface SiteService {

    List<Site> getAllSites();

    void addSite(Site site);

    void updateSite(Long id, Site site);

    void removeSite(Long id);

}


