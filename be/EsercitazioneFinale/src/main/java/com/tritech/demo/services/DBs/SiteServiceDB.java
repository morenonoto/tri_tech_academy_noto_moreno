package com.tritech.demo.services.DBs;

import com.tritech.demo.models.Site;
import com.tritech.demo.repositories.SiteRepository;
import com.tritech.demo.services.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SiteServiceDB implements SiteService {

    @Autowired
    private SiteRepository siteRepository;


    @Override
    public List<Site> getAllSites() {
        return this.siteRepository.findAll();
    }


    @Override
    public void addSite(Site site) {
        this.siteRepository.save(site);
    }


    @Override
    public void updateSite(Long id, Site site) {
        Optional<Site> siteToUpdate = this.siteRepository.findById(id);

        if (siteToUpdate.isPresent()){

            Site newSite = new Site();

            newSite.setId(id);
            newSite.setName(site.getName());
            newSite.setAddress(site.getAddress());

            this.siteRepository.save(newSite);

        }
    }


    @Override
    public void removeSite(Long id) {
        this.siteRepository.deleteById(id);
    }
}
