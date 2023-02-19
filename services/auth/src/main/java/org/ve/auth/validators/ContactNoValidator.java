package org.ve.auth.validators;

import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ContactNoValidator {
    public static boolean validateContactNo(String contactNo) {
        // check if the contactNo is null or empty
        if (contactNo == null || contactNo.isEmpty()) {
            return false;
        }
        // regular expression to match contactNo
        String regex = "^[0][0-9]{9}$";
        // compile the regex into a pattern
        Pattern pattern = Pattern.compile(regex);
        // match the contactNo with the pattern
        Matcher matcher = pattern.matcher(contactNo);
        // return true if the contactNo matches the pattern, otherwise false
        return matcher.matches();
    }
}
