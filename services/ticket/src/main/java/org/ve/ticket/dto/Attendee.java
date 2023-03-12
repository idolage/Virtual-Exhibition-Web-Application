package org.ve.ticket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Attendee {
    private String emailAddress;
    private String name;
    private String nic;
    private UserRole userRole = UserRole.ATTENDEE;
    private boolean locked = false;
    private boolean enabled = false;
}
