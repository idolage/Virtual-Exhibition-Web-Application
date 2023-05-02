package org.ve.stall.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.ve.stall.service.StallService;
import org.ve.stall.model.Stall;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
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
    @PostMapping("/upload-logo/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadLogo(@PathVariable String exhibitionId, @RequestParam String logo, @RequestParam String stallId, String stallOwnerId, String tier) throws Exception {
        return stallService.uploadLogo(exhibitionId,stallId,logo,stallOwnerId,tier);
    }
    @PostMapping("/upload-banner/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadBanners(@PathVariable String exhibitionId,@RequestParam("files") MultipartFile[] files, @RequestParam String stallId, String stallOwnerId, String tier) throws Exception {
        return stallService.uploadBanners(Arrays.asList(files),stallId,exhibitionId,stallOwnerId,tier);
    }
    @PostMapping("/upload-video/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> uploadVideo(@PathVariable String exhibitionId, @RequestParam String stallId,@RequestParam("file") MultipartFile file,String stallOwnerId, String tier) throws Exception {
        return stallService.uploadVideo(file, stallId,stallOwnerId,exhibitionId,tier);
    }

    @PostMapping("/upload-3dmodel/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> upload3DModel(@PathVariable String exhibitionId, @RequestParam String stallId,@RequestParam("file") MultipartFile file,String stallOwnerId, String tier) throws Exception {
        return stallService.upload3DModel(file, stallId,stallOwnerId,exhibitionId,tier);
    }
    @GetMapping ("/{stallOwnerId}")
    @ResponseStatus(HttpStatus.OK)
    public List<Stall> getStallsByOwner(@PathVariable String stallOwnerId) throws InterruptedException, ExecutionException{
        return stallService.getStallsByOwner(stallOwnerId);}
    @GetMapping ("/{exhibitionId}/stallId")
    @ResponseStatus(HttpStatus.OK)
    public Stall getStallsByExhibition(@PathVariable String exhibitionId, @RequestParam String stallId) throws InterruptedException, ExecutionException{
        return stallService.getStallsByExhibition(exhibitionId,stallId);}

    @GetMapping ("/booked/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getBookedStalls(@PathVariable String exhibitionId) throws InterruptedException, ExecutionException{
        return stallService.getBookedStalls(exhibitionId);}

    @GetMapping ("/{exhibitionId}/stall")
    @ResponseStatus(HttpStatus.OK)
    public String getBookedStall(@PathVariable String exhibitionId, @RequestParam String stallOwnerId) throws InterruptedException, ExecutionException {
        return stallService.getBookedStall(exhibitionId, stallOwnerId);
    }

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

