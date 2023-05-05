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
    private String stallName;
    private String stallColor;
    private String tier;
    private String bannerUrl1;
    private String bannerUrl2;
    private String bannerUrl3;
    private String bannerUrl4;
    private String bannerUrl5;
    private String bannerUrl6;
    private String logoUrl;
    private String videoUrl;
    private String model;

}
