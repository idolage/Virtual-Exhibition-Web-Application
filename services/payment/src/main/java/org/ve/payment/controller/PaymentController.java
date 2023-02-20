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
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/api/payment/add")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> addPayment(@RequestBody Payment payment){
        return paymentService.addPayment(payment);
    }

    @GetMapping("/api/payment/payments")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getPayments(){
        return paymentService.getPayments();
    }

    @GetMapping("/api/payment/{documentId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getPayment(@PathVariable String documentId){
        return paymentService.getPayment(documentId);
    }

    @GetMapping("/test")
    public ResponseEntity<String> testGetEndpoints(){
        return ResponseEntity.ok("Test endpoint is working");
    }
}
