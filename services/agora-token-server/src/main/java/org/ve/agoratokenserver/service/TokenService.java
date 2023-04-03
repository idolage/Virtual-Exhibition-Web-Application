package org.ve.agoratokenserver.service;

import com.ctc.wstx.shaded.msv_core.driver.textui.Debug;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ve.agoratokenserver.Repository.TokenRepository;
import org.ve.agoratokenserver.model.AgoraRepository;
import org.ve.agoratokenserver.model.AgoraToken;
import org.ve.agoratokenserver.service.media.RtcTokenBuilder;

import javax.ws.rs.core.Response;

@Service
public class TokenService {
    @Autowired
    private TokenRepository repository;

    public String addLiveStreamChannel(AgoraToken token){

        try {
            token.setToken("");
            token.setChannelName("channel_"+token.getExhibitionId()+"_"+token.getStallId());
            token.setIsStarted(false);
            repository.save(token);
            return "Live Stream Channel Created Successfully";
        }catch (Exception e){
            e.printStackTrace();
            return e.toString();
        }

    }

    public ResponseEntity<?> getLiveStreamChannelInfo(String exhibitionId,String stallId){
        AgoraToken token=repository.findByExhibitionIdAndStallId(exhibitionId,stallId);
        if(token!=null){
            return new ResponseEntity<>(token, HttpStatus.OK);


        }
        return new ResponseEntity<>("No live streaming info found for the channel", HttpStatus.NOT_FOUND);

    }

    public String updateLiveStreamChannelInfo(AgoraRepository resource){
        AgoraToken existingToken=repository.findByExhibitionIdAndStallId(resource.getExhibitionId(),resource.getStallId());
       if(existingToken!=null) {

           RtcTokenBuilder token = new RtcTokenBuilder();

           String channelName = existingToken.getChannelName();

           int expireTime = resource.getExpirationTimeInSeconds();
           RtcTokenBuilder.Role role = RtcTokenBuilder.Role.Role_Subscriber;
           int uid = resource.getUid();

           // check for null channelName
           if (channelName == null) {
               JSONObject error = new JSONObject();
               error.put("error", "Channel ID cannot be blank");
               return Response.status(Response.Status.BAD_REQUEST).entity(error).build().toString();
           }

           if (expireTime == 0) {
               expireTime = 3600;
           }

           if (resource.getRole() == 1) {
               role = RtcTokenBuilder.Role.Role_Publisher;
           } else if (resource.getRole() == 0) {
               role = RtcTokenBuilder.Role.Role_Attendee;
           }

           int timestamp = (int) (System.currentTimeMillis() / 1000 + expireTime);


           String newToken = token.buildTokenWithUid(resource.getAppId(), resource.getAppCertificate(),
                   channelName, uid, role, timestamp);

               existingToken.setToken(newToken);
               existingToken.setIsStarted(true);

               try {
                   repository.save(existingToken);
                   return "Live Stream Channel information updated successfully";
               } catch (Exception e) {
                   e.printStackTrace();
                   return e.toString();
               }



       }
        return "No matching record found";

    }


    public String stopLiveStreamChannel(AgoraToken token){
        AgoraToken existingToken=repository.findByExhibitionIdAndStallId(token.getExhibitionId(),token.getStallId());


        if(existingToken!=null){
            existingToken.setIsStarted(false);
            existingToken.setToken("");

            try {
                repository.save(existingToken);
                return "Live Stream Channel Stopped successfully";
            } catch (Exception e) {
                e.printStackTrace();
                return e.toString();
            }

        }


        return "No matching record found";

    }




}
