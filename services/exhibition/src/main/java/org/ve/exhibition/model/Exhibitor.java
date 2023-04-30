package org.ve.exhibition.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Exhibitor {
    private String emailAddress;
    private String name;
    private String contactNo;
    private String nic;
    private String company;
    private String exhibitionId;
    private boolean enabled;
}
