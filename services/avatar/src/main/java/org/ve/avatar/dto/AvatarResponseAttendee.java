package org.ve.avatar.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AvatarResponseAttendee {
    private String id;
    private Attendee attendee;
    private String avatarId;
    private String  bottomColor;
    private String  topColor;
    private String  shoeColor;
    private String  hairColor;
    private String  beardColor;
    private String  skinColor;

    private String  gender;
}
