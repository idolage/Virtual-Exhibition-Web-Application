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
}
