package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.model.Passager;
import com.covoabanat.covoiturage_femmes.service.PassagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/passagers")
@CrossOrigin(origins = "http://localhost:4200")
public class PassagerController {

    @Autowired
    private PassagerService passagerService;

    @GetMapping("/user/{userId}")
    public Passager getPassagerByUserId(@PathVariable Long userId) {
        return passagerService.getByUserId(userId);
    }

    // ✅ Le PUT mapping doit être dans la classe
    //@PutMapping("/user/{userId}")
    //public Passager updatePassager(@PathVariable Long userId, @RequestBody @Valid PassagerUpdateRequest updateRequest) {
        //return passagerService.updatePassagerProfile(userId, updateRequest);
    //}
}
