package org.ve.feedback.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.feedback.model.Feedback;
import org.ve.feedback.service.FeedbackService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/feedbacks")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> addFeedback(@RequestBody Feedback feedback){
        return feedbackService.addFeedback(feedback);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getFeedback(@PathVariable String id){
        return feedbackService.getFeedback(id);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getFeedbacks(){
        return feedbackService.getFeedbacks();
    }

    @GetMapping("/exhibition/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getFeedbacksByExhibitionId(@PathVariable String id){
        return feedbackService.getFeedbacksByExhibitionId(id);
    }

    @GetMapping("/userRole")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getFeedbacksByUserRole(@RequestParam String userRole){
        return feedbackService.getFeedbacksByUserRole(userRole);
    }

    @GetMapping("/type")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getFeedbacksByType(@RequestParam String type){
        return feedbackService.getFeedbacksByType(type);
    }
}
