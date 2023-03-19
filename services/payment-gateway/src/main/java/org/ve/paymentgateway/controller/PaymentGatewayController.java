package org.ve.paymentgateway.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.paymentgateway.client.StripeClient;
import org.ve.paymentgateway.model.PaymentRequest;
import org.ve.paymentgateway.service.PaymentGatewayService;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment-gateway")
public class PaymentGatewayController {
    @Autowired
    private final PaymentGatewayService paymentGatewayService;

    @PostMapping("/charge")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> charge(@RequestBody PaymentRequest paymentRequest) throws StripeException{
        String chargeId = paymentGatewayService.charge(paymentRequest);
        return chargeId != null ? new ResponseEntity<String>(chargeId, HttpStatus.OK) :
                new ResponseEntity<>("Please check the credit card details",HttpStatus.BAD_REQUEST);
    }


//    private StripeClient stripeClient;
//    @Autowired
//    PaymentGatewayController(StripeClient stripeClient) {
//        this.stripeClient = stripeClient;
//    }
//    @PostMapping("/charge")
//    public Charge chargeCard(@RequestHeader(value="token") String token, @RequestHeader(value="amount") Double amount) throws Exception {
//        return this.stripeClient.chargeNewCard(token, amount);
//    }
}
