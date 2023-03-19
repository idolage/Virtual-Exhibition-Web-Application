package org.ve.paymentgateway.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.ve.paymentgateway.model.PaymentRequest;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentGatewayService {

    @PostConstruct
    public void init(){
        Stripe.apiKey= "sk_test_51Mmz4YD6ZxcX2rToPv31O52xOZqAd3O8H2zNh9kF0ED0gZcv7kvzVtMqCcNOoeAW7Wvphz4F4bswoapNOy6cGcTz000JxgqEqa";
    }

    public String charge(PaymentRequest chargeRequest) throws StripeException {
        Map<String,Object> chargeParams = new HashMap<>();
        chargeParams.put("amount",chargeRequest.getAmount());
        chargeParams.put("currency", PaymentRequest.Currency.USD);
        chargeParams.put("source", chargeRequest.getToken().getId());

        Charge charge = Charge.create(chargeParams);
        return charge.getId();
    }
}
