package com.tritech.demo.controllers;

import com.tritech.demo.models.Site;
import com.tritech.demo.services.DBs.SiteServiceDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SiteController {

    @Autowired
    private SiteServiceDB siteServiceDB;



    @GetMapping(value = "/sites")
    public List<Site> getAllSites(){
        return this.siteServiceDB.getAllSites();
    }



    @PostMapping(value = "/sites")
    public void addSite(@RequestBody Site site){
        this.siteServiceDB.addSite(site);
    }



    @PutMapping(value = "/sites/{id}")
    public void updateSite(@PathVariable Long id, @RequestBody Site site){
        this.siteServiceDB.updateSite(id, site);
    }



    @DeleteMapping(value = "/sites/{id}")
    public void removeSite(@PathVariable Long id){
        this.siteServiceDB.removeSite(id);
    }

}
