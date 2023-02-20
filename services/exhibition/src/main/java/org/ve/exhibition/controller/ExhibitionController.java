package org.ve.exhibition.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.exhibition.model.Exhibition;
import org.ve.exhibition.service.ExhibitionService;

import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class ExhibitionController {
    private final ExhibitionService exhibitionService;

    @PostMapping ("/api/exhibitions/add")
    @ResponseStatus(HttpStatus.OK)
    public String addExhibition(@RequestBody Exhibition exhibition) throws InterruptedException, ExecutionException{
        return exhibitionService.addExhibition(exhibition);
    }

    @GetMapping ("/api/exhibitions/{documentId}")
    @ResponseStatus(HttpStatus.OK)
    public Exhibition getExhibition(@PathVariable String documentId) throws InterruptedException, ExecutionException{
        return exhibitionService.getExhibition(documentId);
    }

    @GetMapping ("/api/exhibitions")
    @ResponseStatus(HttpStatus.OK)
    public List<Exhibition> getExhibitions() throws CancellationException {
        return exhibitionService.getExhibitions();
    }

    @GetMapping("/api/exhibitions/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public Exhibition getExhibitionByExhibitionId(@PathVariable String exhibitionId) throws CancellationException, InterruptedException, ExecutionException{
        return exhibitionService.getExhibitionByExhibitionId(exhibitionId);
    }

    @PutMapping ("/api/exhibitions/update/{documentId}")
    @ResponseStatus(HttpStatus.OK)
    public String updateExhibitions(@RequestBody Exhibition exhibition, @PathVariable String documentId) throws InterruptedException, ExecutionException {
        return exhibitionService.updateExhibition(exhibition, documentId);
    }

    @DeleteMapping ("/api/exhibitions/delete/{documentId}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteExhibition(@PathVariable String documentId) {
        return exhibitionService.deleteExhibition(documentId);
    }

    @PutMapping("/api/exhibitions/start/{documentId}/{start}")
    @ResponseStatus(HttpStatus.OK)
    public String startExhibition(@PathVariable String documentId,@PathVariable boolean start) throws InterruptedException, ExecutionException {
        return exhibitionService.startExhibition(documentId,start);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoints(){
        return ResponseEntity.ok("Test endpoint is working");
    }

}
