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
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/avatars")
public class AvatarController {
    private final AvatarService avatarService;
    @PostMapping ()
    @ResponseStatus(HttpStatus.OK)
    public String addAvatar(@RequestBody Avatar avatar) {
        return avatarService.addAvatar(avatar);
    }

    @GetMapping ("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Avatar getAvatar(@PathVariable String userId) {
        return avatarService.getAvatar(userId);
    }

    @GetMapping ()
    public List<Avatar> getAvatars() throws CancellationException {
        return avatarService.getAvatars();
    }

    @PutMapping ()
    public String updateAvatars(@RequestBody Avatar avatar) throws InterruptedException, ExecutionException {
        return avatarService.updateAvatar(avatar);
    }

    @DeleteMapping ("/{user_id}")
    public String deleteAvatar(@PathVariable String user_id) {
        return avatarService.deleteAvatar(user_id);
    }



}
