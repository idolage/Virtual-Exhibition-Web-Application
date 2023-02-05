package org.ve.stall.common;
import org.springframework.stereotype.Service;

@Service

public class Constants {
    public static final String FIREBASE_SDK_JSON ="/stall/src/main/resources/serviceAccountKey.json";//copy the sdk-config file root address, if its in root ,filename is enough
    public static final String FIREBASE_BUCKET = "virtual-exhibition-platform.appspot.com";//enter your bucket name
    public static final String FIREBASE_PROJECT_ID ="virtual-exhibition-platform";//enter your project id
}
