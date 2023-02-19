package org.ve.avatar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ve.avatar.model.Avatar;
import org.ve.avatar.repository.AvatarRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
@Service
public class AvatarService {
    @Autowired
    private AvatarRepository repository;

    public String addAvatar(Avatar avatar) {
       try {
           repository.save(avatar);
           return "Avatar Added Successfully";
       }catch (Exception e){
           e.printStackTrace();
           return e.toString();
       }
    }

    public Avatar getAvatar(String userId) {
        try {
            Avatar avatar=repository.findByUserId(userId);
            return avatar;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
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
            existingAvatar.setUserId(avatar.getUserId());
            existingAvatar.setAvatarId(avatar.getAvatarId());
            existingAvatar.setGender(avatar.getGender());
            existingAvatar.setHairColor(avatar.getHairColor());
            existingAvatar.setBottomColor(avatar.getBottomColor());
            existingAvatar.setTopColor(avatar.getTopColor());
            existingAvatar.setShoeColor(avatar.getShoeColor());
            existingAvatar.setBeardColor(avatar.getBeardColor());

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
        repository.deleteByUserId(user_id);
        return "Successfully deleted "+ user_id;
    }
}
