package org.ve.avatar.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AvatarResponseExhibitionOwner {
    private String id;
    private ExhibitionOwner exhibitionOwner;
    private String avatarId;
    private String  bottomColor;
    private String  topColor;
    private String  shoeColor;
    private String  hairColor;
    private String  beardColor;
    private String  gender;
}
