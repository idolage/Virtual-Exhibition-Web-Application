package org.ve.payment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ve.payment.dto.Exhibition;
import org.ve.payment.dto.PaymentResponse;
import org.ve.payment.model.Payment;
import org.ve.payment.repository.PaymentRepository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<?> addPayment(Payment payment){
        try{
            payment.setTicket(UUID.randomUUID().toString());
            payment.setTimestamp(Timestamp.from(Instant.now()).toString());
            return new ResponseEntity<Payment>(paymentRepository.save(payment), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> getPayments(){
        List<Payment> payments = paymentRepository.findAll();
        try{
            return new ResponseEntity<List<Payment>>(payments, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getPayment(String documentId){
        Optional<Payment> payment = paymentRepository.findById(documentId);
        if(payment.isPresent()){
            Exhibition exhibition = restTemplate
                    .getForObject("http://EXHIBITION-SERVICE/api/exhibitions/"+
                            payment.get().getExhibitionId(), Exhibition.class);
            PaymentResponse paymentResponse = new PaymentResponse(
                    payment.get().getId(),
                    exhibition,
                    payment.get().getUserId(),
                    payment.get().getAmount(),
                    payment.get().getTicket(),
                    payment.get().getTimestamp()
            );
            return new ResponseEntity<>(paymentResponse, HttpStatus.OK);
        } else{
            return new ResponseEntity<>("No payment found",HttpStatus.NOT_FOUND);
        }
    }
}
