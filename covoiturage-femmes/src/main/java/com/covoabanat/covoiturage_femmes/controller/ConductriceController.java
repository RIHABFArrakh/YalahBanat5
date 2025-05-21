package com.covoabanat.covoiturage_femmes.controller;

import com.covoabanat.covoiturage_femmes.model.Conductrice;
import com.covoabanat.covoiturage_femmes.service.ConductriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

// ConductriceController.java
@RestController
@RequestMapping("/api/conductrices")
@CrossOrigin(origins = "http://localhost:4200") // update if needed
public class ConductriceController {

    @Autowired
    private ConductriceService conductriceService;

    @GetMapping("/user/{userId}")
    public Conductrice getConductriceByUserId(@PathVariable Long userId) {
        return conductriceService.getByUserId(userId);
    }
    //@GetMapping("/me")
    // public ResponseEntity<Conductrice> getCurrentConductrice(@AuthenticationPrincipal UserDetails userDetails) {
    //    Conductrice conductrice = conductriceService.findByEmail(userDetails.getUsername());
    //   return ResponseEntity.ok(conductrice);
    //}
}
