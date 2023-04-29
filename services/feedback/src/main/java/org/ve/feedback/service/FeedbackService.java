package org.ve.feedback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ve.feedback.dto.Exhibition;
import org.ve.feedback.dto.FeedbackResponse;
import org.ve.feedback.model.Feedback;
import org.ve.feedback.repository.FeedbackRepository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> addFeedback(Feedback feedback){
        try{
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<Feedback> httpEntity = new HttpEntity<Feedback>(feedback,httpHeaders);
            return new ResponseEntity<Feedback>(feedbackRepository.save(feedback), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getFeedbacks(){
        List<Feedback> feedbacks = feedbackRepository.findAll();
        try{
            return new ResponseEntity<List<Feedback>>(feedbacks, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getFeedback(String id){
        Optional<Feedback> feedback = feedbackRepository.findById(id);
        if(feedback.isPresent()){
            Exhibition exhibition = restTemplate
                    .getForObject("http://EXHIBITION-SERVICE/api/exhibitions/"+
                            feedback.get().getExhibitionId(), Exhibition.class);
            assert exhibition != null;
            FeedbackResponse feedbackResponse = new FeedbackResponse(
                    feedback.get().getId(),
                    exhibition.getExhibitionName(),
                    feedback.get().getFeedback(),
                    feedback.get().getUserRole(),
                    feedback.get().getType()
            );
            return new ResponseEntity<>(feedbackResponse, HttpStatus.OK);
        } else{
            return new ResponseEntity<>("No feedback found",HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getFeedbacksByExhibitionId(String id){
        List<Feedback> feedbacks = feedbackRepository.findByExhibitionId(id);
        if(feedbacks.size()>0){
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } else{
            return new ResponseEntity<>("No feedbacks found",HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getFeedbacksByUserRole(String userRole){
        List<Feedback> feedbacks = feedbackRepository.findByUserRole(userRole);
        if(feedbacks.size()>0){
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } else{
            return new ResponseEntity<>("No feedbacks found",HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getFeedbacksByType(String type){
        List<Feedback> feedbacks = feedbackRepository.findByType(type);
        if(feedbacks.size()>0){
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } else{
            return new ResponseEntity<>("No feedbacks found",HttpStatus.NOT_FOUND);
        }
    }
}
