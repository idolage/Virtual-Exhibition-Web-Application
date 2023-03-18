package org.ve.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    private String ticketId;
    private String exhibitionId;
    private String userId;
    private String userType;
    private Boolean isExpired;
}
