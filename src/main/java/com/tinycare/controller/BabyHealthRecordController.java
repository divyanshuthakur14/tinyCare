package com.tinycare.controller;

import com.tinycare.dto.BabyHealthRecordDTO;
import com.tinycare.service.BabyHealthRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/babies")
public class BabyHealthRecordController {

    @Autowired
    private BabyHealthRecordService babyService;

    @PostMapping
    public ResponseEntity<?> createBabyRecord(@RequestBody BabyHealthRecordDTO dto) {
        return ResponseEntity.ok(babyService.createRecord(dto));
    }

    @GetMapping
    public ResponseEntity<List<BabyHealthRecordDTO>> getAllBabiesForUser(Authentication auth) {
        String email = auth.getName();
        List<BabyHealthRecordDTO> babies = babyService.getBabiesForUser(email);
        return ResponseEntity.ok(babies);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBaby(
            @PathVariable Long id,
            @RequestBody BabyHealthRecordDTO dto,
            Authentication auth
    ) {
        String email = auth.getName();
        return ResponseEntity.ok(babyService.updateBaby(id, dto, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBaby(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        babyService.deleteBaby(id, email);
        return ResponseEntity.ok("Baby record deleted");
    }


}
