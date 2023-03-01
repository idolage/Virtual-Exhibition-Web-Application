package org.ve.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.payment.model.Payment;
import org.ve.payment.service.PaymentService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> addPayment(@RequestBody Payment payment){
        return paymentService.addPayment(payment);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getPayments(){
        return paymentService.getPayments();
    }

    @GetMapping("/{paymentId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getPayment(@PathVariable String paymentId){
        return paymentService.getPayment(paymentId);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoints(){
        return ResponseEntity.ok("Test endpoint is working");
    }
}
