package org.ve.avatar.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.ve.avatar.dto.*;
import org.ve.avatar.model.Avatar;
import org.ve.avatar.repository.AvatarRepository;

import java.util.*;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
@Service
public class AvatarService {
    @Autowired
    private AvatarRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    public String addAvatar(Avatar avatar) {
       try {
           repository.save(avatar);
           return "Avatar Added Successfully";
       }catch (Exception e){
           e.printStackTrace();
           return e.toString();
       }
    }

    public ResponseEntity<?> getAvatar(String userId) {
        Avatar avatar = repository.findByUserId(userId);
        if(avatar != null){
            if(Objects.equals(avatar.getUserType(), "ATTENDEE")){
                Attendee attendee = restTemplate
                        .getForObject("http://AUTH-SERVICE/api/auth/getAttendee/"+
                                avatar.getUserId(), Attendee.class);
                AvatarResponseAttendee avatarResponseAttendee = new AvatarResponseAttendee(
                        avatar.getId(),
                        attendee,
                        avatar.getAvatarId(),
                        avatar.getBottomColor(),
                        avatar.getTopColor(),
                        avatar.getShoeColor(),
                        avatar.getHairColor(),
                        avatar.getBeardColor(),
                        avatar.getSkinColor(),
                        avatar.getGender()
                        );
                return new ResponseEntity<>(avatarResponseAttendee, HttpStatus.OK);
            } else if(Objects.equals(avatar.getUserType(), "EXHIBITOR")){
                Exhibitor exhibitor = restTemplate
                        .getForObject("http://AUTH-SERVICE/api/auth/getExhibitor/"+
                                avatar.getUserId(), Exhibitor.class);
                AvatarResponseExhibitor avatarResponseExhibitor = new AvatarResponseExhibitor(
                        avatar.getId(),
                        exhibitor,
                        avatar.getAvatarId(),
                        avatar.getBottomColor(),
                        avatar.getTopColor(),
                        avatar.getShoeColor(),
                        avatar.getHairColor(),
                        avatar.getBeardColor(),
                        avatar.getSkinColor(),
                        avatar.getGender()

                );
                return new ResponseEntity<>(avatarResponseExhibitor, HttpStatus.OK);
            } else if(Objects.equals(avatar.getUserType(), "EX_OWNER")){
                ExhibitionOwner exhibitionOwner = restTemplate
                        .getForObject("http://AUTH-SERVICE/api/auth/getExhibitionOwner/"+
                                avatar.getUserId(), ExhibitionOwner.class);
                AvatarResponseExhibitionOwner avatarResponseExhibitionOwner = new AvatarResponseExhibitionOwner(
                        avatar.getId(),
                        exhibitionOwner,
                        avatar.getAvatarId(),
                        avatar.getBottomColor(),
                        avatar.getTopColor(),
                        avatar.getShoeColor(),
                        avatar.getHairColor(),
                        avatar.getBeardColor(),
                        avatar.getSkinColor(),
                        avatar.getGender()

                );
                return new ResponseEntity<>(avatarResponseExhibitionOwner, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("No avatar found",HttpStatus.NOT_FOUND);
    }

    public List<Avatar> getAvatars() throws CancellationException {
        try {
            List<Avatar> avatars=repository.findAll();
            return avatars;
        } catch (Exception e) {
            e.printStackTrace();

        }
        return null;


    }

    public String updateAvatar(Avatar avatar)throws InterruptedException, ExecutionException{

        Avatar existingAvatar=repository.findByUserId(avatar.getUserId());
        if(existingAvatar!=null) {
            existingAvatar.setAvatarId(avatar.getAvatarId());
            existingAvatar.setGender(avatar.getGender());
            existingAvatar.setHairColor(avatar.getHairColor());
            existingAvatar.setBottomColor(avatar.getBottomColor());
            existingAvatar.setTopColor(avatar.getTopColor());
            existingAvatar.setShoeColor(avatar.getShoeColor());
            existingAvatar.setBeardColor(avatar.getBeardColor());
            existingAvatar.setSkinColor(avatar.getSkinColor());

            try {
                repository.save(existingAvatar);
                return "Avatar updated successfully";
            } catch (Exception e) {
                e.printStackTrace();
                return e.toString();
            }
        }
        return "No matching record found";
    }
    @Transactional
    public String deleteAvatar(String user_id){
        Avatar existingAvatar=repository.findByUserId(user_id);
        if(existingAvatar!=null) {
            repository.deleteByUserId(user_id);
            return "Successfully deleted " + user_id;
        }
        return "No matching record found";

    }



}
