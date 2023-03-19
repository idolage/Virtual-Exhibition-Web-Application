package org.ve.paymentgateway.model;

import com.stripe.model.Token;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaymentRequest {
    public enum Currency {
        USD;
    }
    private int amount;
    private Currency currency;
    private Token token;
}
