package org.ve.auth.tokens;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class TempPwdGenerator {
    public String generateTempPwd() {
        UUID uuid = UUID.randomUUID();
        String password = uuid.toString().replace("-", "").substring(0, 9);
        return password;
    }
}
