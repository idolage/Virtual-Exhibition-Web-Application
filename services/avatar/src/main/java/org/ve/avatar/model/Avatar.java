package org.ve.avatar.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "USER_AVATARS")
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String userId;
    @Column
    private String avatarId;
    @Column
    private String  bottomColor;
    @Column
    private String  topColor;
    @Column
    private String  shoeColor;
    @Column
    private String  hairColor;
    @Column
    private String  beardColor;
    @Column
    private String  gender;


}
