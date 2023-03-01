package org.ve.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Exhibition {
    private String id;
    private String exhibitionName;
    private String exhibitionOwnerId;
    private String exhibitionId;
    private boolean start;
    private boolean isOver;
    private String datetime;
}
