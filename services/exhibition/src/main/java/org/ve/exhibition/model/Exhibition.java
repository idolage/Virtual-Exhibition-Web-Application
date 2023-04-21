package org.ve.exhibition.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Exhibition {
    private String id;
    private String exhibitionName;
    private String exhibitionOwnerId;
    private String exhibitionId;
    private int ticketPrice;
    private boolean start;
    private boolean isOver;
    private String datetime;
    private String sponsorVideoUrl1;
    private String sponsorVideoUrl2;
    private String sponsorVideoUrl3;
    private String sponsorVideoUrl4;
    private int noOfUsers;
}
