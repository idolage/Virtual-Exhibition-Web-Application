package org.ve.exhibition.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitionResponse {
    private String id;
    private String exhibitionName;
    private ExhibitionOwner exhibitionOwner;
    private String exhibitionId;
    private boolean start;
    private boolean isOver;
    private String datetime;
    private String sponsorVideoUrl1;
    private String sponsorVideoUrl2;
    private String sponsorVideoUrl3;
    private String sponsorVideoUrl4;
}
