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

@RestController
@RequiredArgsConstructor
public class ExhibitionController {
    private final ExhibitionService exhibitionService;

    @PostMapping ("/api/exhibition/add")
    @ResponseStatus(HttpStatus.OK)
    public String addExhibition(@RequestBody Exhibition exhibition) throws InterruptedException, ExecutionException{
        return exhibitionService.addExhibition(exhibition);
    }

    @GetMapping ("/api/exhibition")
    @ResponseStatus(HttpStatus.OK)
    public Exhibition getExhibition(@RequestParam String documentId) throws InterruptedException, ExecutionException{
        return exhibitionService.getExhibition(documentId);
    }

    @GetMapping ("/api/exhibition/exhibitions")
    public List<Exhibition> getExhibitions() throws CancellationException {
        return exhibitionService.getExhibitions();
    }

    @PutMapping ("/api/exhibition/update")
    public String updateExhibitions(@RequestBody Exhibition exhibition, @RequestParam String documentId) throws InterruptedException, ExecutionException {
        return exhibitionService.updateExhibition(exhibition, documentId);
    }

    @DeleteMapping ("/api/exhibition/delete")
    public String deleteExhibition(@RequestParam String documentId) {
        return exhibitionService.deleteExhibition(documentId);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoints(){
        return ResponseEntity.ok("Test endpoint is working");
    }

}
