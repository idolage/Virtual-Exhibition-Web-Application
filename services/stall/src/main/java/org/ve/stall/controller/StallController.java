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
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stalls")

public class StallController {
    private final StallService stallService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Stall> getAllStalls() throws CancellationException {
        return stallService.getAllStalls();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public String addStall(@RequestBody Stall stall) throws InterruptedException, ExecutionException{
        String stallId= stall.getStallId();
        return stallService.addStall(stall,stallId);
    }
    @PostMapping("/upload-logo/{stallId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadLogo(@PathVariable String stallId,@RequestParam("file") MultipartFile file,String stallOwnerId, String exhibitionId, String tier) throws Exception {
        return stallService.uploadLogo(file,stallId,stallOwnerId,exhibitionId,tier);
    }
    @PostMapping("/upload-banner/{stallId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadBanner(@PathVariable String stallId,@RequestParam("file") MultipartFile file,String stallOwnerId, String exhibitionId, String tier) throws Exception {
        return stallService.uploadBanner(file,stallId,stallOwnerId,exhibitionId,tier);
    }
    @PostMapping("/upload-video/{stallId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadVideo(@PathVariable String stallId,@RequestParam("file") MultipartFile file,String stallOwnerId, String exhibitionId, String tier) throws Exception {
        return stallService.uploadVideo(file, stallId,stallOwnerId,exhibitionId,tier);
    }
    @GetMapping ("/{stallOwnerId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Stall> getStallsByOwner(@PathVariable String stallOwnerId) throws InterruptedException, ExecutionException{
        return stallService.getStallsByOwner(stallOwnerId);}

    @GetMapping ("/booked/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public String[] getBookedStalls(@PathVariable String exhibitionId) throws InterruptedException, ExecutionException{
        return stallService.getBookedStalls(exhibitionId);}
    @PutMapping ("/{stallId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateStall(@PathVariable String stallId,@RequestBody Stall stall) throws InterruptedException, ExecutionException {
        return stallService.updateStall(stall,stallId);
    }
    @DeleteMapping ("/{stallId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteStall(@PathVariable String stallId) {
        return stallService.deleteStall(stallId);
    }

}

