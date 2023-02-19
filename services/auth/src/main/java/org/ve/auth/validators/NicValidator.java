package org.ve.auth.validators;

import org.springframework.stereotype.Service;

@Service
public class NicValidator {
    public boolean isValidNic(String nic) {
        // Check if NIC has 10 characters (including 'V' at the end)
        if (nic.length() == 10 && nic.matches("[0-9]{9}V")) {
            return true;
        }
        // Check if NIC has 12 characters (all digits)
        if (nic.length() == 12 && nic.matches("[0-9]{12}")) {
            return true;
        }
        return false;
    }
}
