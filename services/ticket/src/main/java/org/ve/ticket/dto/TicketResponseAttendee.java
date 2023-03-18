package org.ve.ticket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponseAttendee {
    private String ticketId;
    private Exhibition exhibition;
    private Attendee attendee;
    private Boolean isExpired;
}
