package org.ve.stall.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.ve.stall.service.StallService;
import org.ve.stall.model.Stall;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.ExecutionException;
@RestController
@RequiredArgsConstructor

public class StallController {
    private final StallService stallService;

    @PostMapping("/api/stall/add")
    @ResponseStatus(HttpStatus.OK)
    public String addStall(@RequestBody Stall stall) throws InterruptedException, ExecutionException{
        int stallId= stall.getStallId();
        return stallService.addStall(stall,stallId);
    }
    @PostMapping("/api/stall/upload-logo")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadLogo(@RequestParam("file") MultipartFile file) throws Exception {
        return stallService.uploadLogo(file);
    }
    @PostMapping("/api/stall/upload-banner")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadBanner(@RequestParam("file") MultipartFile file) throws Exception {
        return stallService.uploadBanner(file);
    }
    }

