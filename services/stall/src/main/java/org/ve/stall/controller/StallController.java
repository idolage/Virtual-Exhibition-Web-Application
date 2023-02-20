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
    @PostMapping("/api/stall/upload-logo")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadLogo(@RequestParam("file") MultipartFile file,@RequestParam String stallId,String stallOwnerId, String exhibitionId, String tier) throws Exception {
        return stallService.uploadLogo(file,stallId,stallOwnerId,exhibitionId,tier);
    }
    @PostMapping("/api/stall/upload-banner")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadBanner(@RequestParam("file") MultipartFile file,@RequestParam String stallId,String stallOwnerId, String exhibitionId, String tier) throws Exception {
        return stallService.uploadBanner(file,stallId,stallOwnerId,exhibitionId,tier);
    }
    @PostMapping("/api/stall/upload-video")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadVideo(@RequestParam("file") MultipartFile file ,@RequestParam String stallId,String stallOwnerId, String exhibitionId, String tier) throws Exception {
        return stallService.uploadVideo(file, stallId,stallOwnerId,exhibitionId,tier);
    }
    @GetMapping ("/api/stall/get-stalls/{stallOwnerId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Stall> getStalls(@PathVariable String stallOwnerId) throws InterruptedException, ExecutionException{
        return stallService.getStalls(stallOwnerId);}
    @PutMapping ("/api/stall/update/{stallId}")
    public String updateTicket(@RequestBody Stall stall, @PathVariable String stallId) throws InterruptedException, ExecutionException {
        return stallService.updateStall(stall,stallId);
    }
    @DeleteMapping ("/api/stall/delete-stall/{stallId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteStall(@PathVariable String stallId) {
        return stallService.deleteStall(stallId);
    }

    }

