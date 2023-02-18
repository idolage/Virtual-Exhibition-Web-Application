package org.ve.stall.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.ve.stall.service.StallService;
import org.ve.stall.model.Stall;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.concurrent.ExecutionException;
@RestController
@RequiredArgsConstructor

public class StallController {
    private final StallService stallService;

    @PostMapping("/api/stall/add")
    @ResponseStatus(HttpStatus.OK)
    public String addStall(@RequestBody Stall stall) throws InterruptedException, ExecutionException{
        String stallId= stall.getStallId();
        return stallService.addStall(stall,stallId);
    }
    @PutMapping("/api/stall/upload-logo")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadLogo(@RequestParam("file") MultipartFile file,@RequestParam String stallId) throws Exception {
        return stallService.uploadLogo(file,stallId);
    }
    @PutMapping("/api/stall/upload-banner")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadBanner(@RequestParam("file") MultipartFile file,@RequestParam String stallId) throws Exception {
        return stallService.uploadBanner(file, stallId);
    }
    @PutMapping("/api/stall/upload-video")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file ,@RequestParam String stallId) throws Exception {
        return stallService.uploadVideo(file, stallId);
    }
    @GetMapping ("/api/stall/get-stalls")
    @ResponseStatus(HttpStatus.OK)
    public List<Stall> getStalls(@RequestParam String stallOwnerId) throws InterruptedException, ExecutionException{
        return stallService.getStalls(stallOwnerId);}
    @PutMapping ("/api/stall/update")
    public String updateTicket(@RequestBody Stall stall, @RequestParam String stallId) throws InterruptedException, ExecutionException {
        return stallService.updateStall(stall,stallId);
    }
    @DeleteMapping ("/api/stall/delete-stall")
    @ResponseStatus(HttpStatus.OK)
    public String deleteStall(@RequestParam String stallId) {
        return stallService.deleteStall(stallId);
    }

    }

