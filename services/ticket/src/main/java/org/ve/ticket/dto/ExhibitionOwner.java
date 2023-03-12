package org.ve.ticket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitionOwner {
    private String emailAddress;
    private String name;
    private String contactNo;
    private String nic;
    private String company;
    private UserRole userRole=UserRole.EX_OWNER;
    private boolean locked = false;
    private boolean enabled = false;
}