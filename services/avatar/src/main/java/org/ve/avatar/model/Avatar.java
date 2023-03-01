package org.ve.avatar.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "avatars")

public class Avatar {
    @Id
    private String id;

    private String userId;
    private String avatarId;
    private String  bottomColor;
    private String  topColor;
    private String  shoeColor;
    private String  hairColor;
    private String  beardColor;
    private String  gender;


}
