package org.ve.agoratokenserver.controller;


import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.ve.agoratokenserver.model.AgoraRepository;
import org.ve.agoratokenserver.service.media.RtcTokenBuilder;

import javax.ws.rs.core.Response;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/agora")
public class AgoraController {


    @PostMapping("/token")
    @ResponseStatus(HttpStatus.OK)
    public Object getRTCToken(@RequestBody AgoraRepository resource) throws InterruptedException, ExecutionException {
        System.out.println(resource.getChannelName());
        RtcTokenBuilder token = new RtcTokenBuilder();
        String channelName = resource.getChannelName();
        int expireTime = resource.getExpirationTimeInSeconds();
        RtcTokenBuilder.Role role = RtcTokenBuilder.Role.Role_Subscriber;
        int uid = resource.getUid();

        // check for null channelName
        if (channelName==null){
            JSONObject error=new JSONObject();
            error.put("error","Channel ID cannot be blank");
            return Response.status(Response.Status.BAD_REQUEST).entity(error).build();
        }

        if(expireTime==0){
            expireTime = 3600;
        }

        if(resource.getRole()==1){
            role = RtcTokenBuilder.Role.Role_Publisher;
        }else if(resource.getRole()==0){
            role = RtcTokenBuilder.Role.Role_Attendee;
        }

        int timestamp = (int)(System.currentTimeMillis() / 1000 + expireTime);


        String result = token.buildTokenWithUid(resource.getAppId(), resource.getAppCertificate(),
                channelName, uid, role, timestamp);
        System.out.print(result);
        JSONObject jsondict = new JSONObject();
        jsondict.put("message",result);
        return jsondict;


    }
}
