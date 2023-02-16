package org.ve.ticket.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter

public class Ticket {
   private String exhibitionId;
   private String userId;
   private Boolean isExpired;
}
