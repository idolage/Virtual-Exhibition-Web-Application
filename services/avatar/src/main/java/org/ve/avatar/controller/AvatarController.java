package org.ve.avatar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.ve.avatar.model.Avatar;
import org.ve.avatar.service.AvatarService;


import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;

@RestController
@RequiredArgsConstructor
public class AvatarController {
    private final AvatarService avatarService;
    @PostMapping ("/api/avatars/add")
    @ResponseStatus(HttpStatus.OK)
    public String addAvatar(@RequestBody Avatar avatar) {
        return avatarService.addAvatar(avatar);
    }

    @GetMapping ("/api/avatars/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Avatar getAvatar(@PathVariable String userId) {
        return avatarService.getAvatar(userId);
    }

    @GetMapping ("/api/avatars")
    public List<Avatar> getAvatars() throws CancellationException {
        return avatarService.getAvatars();
    }

    @PutMapping ("/api/avatars/update")
    public String updateAvatars(@RequestBody Avatar avatar) throws InterruptedException, ExecutionException {
        return avatarService.updateAvatar(avatar);
    }

    @DeleteMapping ("/api/avatars/delete/{user_id}")
    public String deleteAvatar(@PathVariable String user_id) {
        return avatarService.deleteAvatar(user_id);
    }



}
