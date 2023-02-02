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
    @PostMapping ("/api/avatar/add")
    @ResponseStatus(HttpStatus.OK)
    public String addAvatar(@RequestBody Avatar avatar) throws InterruptedException, ExecutionException{
        return avatarService.addAvatar(avatar);
    }

    @GetMapping ("/api/avatar")
    @ResponseStatus(HttpStatus.OK)
    public Avatar getAvatar(@RequestParam String documentId) throws InterruptedException, ExecutionException{
        return avatarService.getAvatar(documentId);
    }

    @GetMapping ("/api/avatar/avatars")
    public List<Avatar> getAvatars() throws CancellationException {
        return avatarService.getAvatars();
    }

    @PutMapping ("/api/avatar/update")
    public String updateAvatars(@RequestBody Avatar avatar) throws InterruptedException, ExecutionException {
        return avatarService.updateAvatar(avatar);
    }

    @DeleteMapping ("/api/avatar/delete")
    public String deleteAvatar(@RequestParam String documentId) {
        return avatarService.deleteAvatar(documentId);
    }



}
