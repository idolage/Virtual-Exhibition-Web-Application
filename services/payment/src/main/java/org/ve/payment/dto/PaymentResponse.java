package org.ve.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    private String id;
    private Exhibition exhibition;
    private String userId;
    private Float amount;
    private String ticket;
    private String timestamp;
}
