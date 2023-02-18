package org.ve.stall.model;


import com.google.cloud.storage.Blob;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Stall {
    private String exhibitionId;
    private String stallId;
    private String stallOwnerId;
    private String stallColor;


}
