package org.ve.stats.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.stats.model.Stats;
import org.ve.stats.service.StatsService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/stats")
public class StatsController {
    @Autowired
    private StatsService statsService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public String addStat(@RequestBody Stats stat){
        return statsService.addStat(stat);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getStat(@PathVariable String id){
        return statsService.getStat(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getStats(){
        return statsService.getStats();
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> updateStat(@PathVariable String id){
        return statsService.updateStat(id);
    }

    @GetMapping("/exhibition/{exhibitionId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getStats(@PathVariable String exhibitionId){
        return statsService.getStatByExhibitionId(exhibitionId);
    }
}
