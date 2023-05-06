package org.ve.stats.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ve.stats.model.Stats;
import org.ve.stats.repository.StatsRepository;

import java.time.Duration;
import java.time.LocalTime;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
public class StatsService {
    @Autowired
    private StatsRepository statsRepository;

    @Autowired
    private RestTemplate restTemplate;

    public String addStat(Stats stat){
        try{
            stat.setStartTime(LocalTime.now());
            stat.setDuration(0);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<Stats> httpEntity = new HttpEntity<Stats>(stat,httpHeaders);
            return statsRepository.save(stat).getId();
        }catch (Exception e){
            return e.toString();
        }
    }

    public ResponseEntity<?> getStats(){
        List<Stats> stats = statsRepository.findAll();
        try{
            return new ResponseEntity<List<Stats>>(stats, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getStat(String documentId){
        Optional<Stats> stat = statsRepository.findById(documentId);
        if(stat.isPresent()){
            return new ResponseEntity<>(stat.get(), HttpStatus.OK);
        } else{
            return new ResponseEntity<>("No stat found",HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updateStat(String documentId){
        Optional<Stats> stat = statsRepository.findById(documentId);
        if(stat.isPresent()){
            stat.get().setDuration((int) Duration.between(stat.get().getStartTime(),LocalTime.now()).toMinutes());
            HttpHeaders httpHeaders = new HttpHeaders();
            HttpEntity<Stats> httpEntity = new HttpEntity<Stats>(stat.get(),httpHeaders);
            return new ResponseEntity<>(statsRepository.save(stat.get()), HttpStatus.OK);
        } else{
            return new ResponseEntity<>("No stat found",HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getStatSumByExhibitionId(String exhibitionId){
        List<Stats> stats = statsRepository.findByExhibitionId(exhibitionId);
        int sum=0;
        if(stats.size()>0){
            for(int i=0;i<stats.size();i++){
                sum+=stats.get(i).getDuration();
            }
            return new ResponseEntity<>(sum, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(sum,HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getStatAvgByExhibitionId(String exhibitionId){
        List<Stats> stats = statsRepository.findByExhibitionId(exhibitionId);
        int sum=0;
        if(stats.size()>0){
            for(int i=0;i<stats.size();i++){
                sum+=stats.get(i).getDuration();
            }
            return new ResponseEntity<>((sum/stats.size()), HttpStatus.OK);
        } else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getStatMaxByExhibitionId(String exhibitionId){
        List<Stats> stats = statsRepository.findByExhibitionId(exhibitionId);
        int max;
        if(stats.size()>0){
            max=stats.get(0).getDuration();
            for(int i=1;i<stats.size();i++){
                if(max<stats.get(i).getDuration())
                    max=stats.get(i).getDuration();
            }
            return new ResponseEntity<>(max, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getStatMinByExhibitionId(String exhibitionId){
        List<Stats> stats = statsRepository.findByExhibitionId(exhibitionId);
        int min;
        if(stats.size()>0){
            min=stats.get(0).getDuration();
            for(int i=1;i<stats.size();i++){
                if(min>stats.get(i).getDuration())
                    min=stats.get(i).getDuration();
            }
            return new ResponseEntity<>(min, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
}
