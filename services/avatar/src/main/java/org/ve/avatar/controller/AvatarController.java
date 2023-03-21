package org.ve.avatar.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.avatar.model.Avatar;
import org.ve.avatar.service.AvatarService;


import java.util.Date;
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
    public ResponseEntity<?>  getAvatar(@PathVariable String userId) {
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

//    To test api Gateway
    @PostMapping("/test")
    public ResponseEntity<String> testGetEndpoints(){
        Claims claims = Jwts.claims().setSubject("hansi");
        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + 1800000;
        Date exp = new Date(expMillis);
        String token= Jwts.builder().setClaims(claims).setIssuedAt(new Date(nowMillis)).setExpiration(exp)
                .signWith(SignatureAlgorithm.HS512, "virtualExhibitionPlatformWebApplication2023").compact();

        return ResponseEntity.ok(token);
    }





}
