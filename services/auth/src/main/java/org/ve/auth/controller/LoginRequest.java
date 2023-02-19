package org.ve.auth.controller;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class LoginRequest {
    private String emailAddress;
    private String password;

}
