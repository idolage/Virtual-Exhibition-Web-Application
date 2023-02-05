package org.ve.stall.model;


import com.google.cloud.storage.Blob;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Stall {
    private int stallId;
    private String stallOwner;
    private String stallColor;

}
