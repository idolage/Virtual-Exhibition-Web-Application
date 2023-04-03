package org.ve.agoratokenserver.controller;


import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.agoratokenserver.model.AgoraRepository;
import org.ve.agoratokenserver.model.AgoraToken;
import org.ve.agoratokenserver.service.TokenService;
import org.ve.agoratokenserver.service.media.RtcTokenBuilder;

import javax.ws.rs.core.Response;
import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/agora")
public class AgoraController {

    private  final TokenService tokenService;


    //Call the api when  you are purchasing a diamond or platinum stall to set the channel name for live streaming.
    @PostMapping ("/liveStreamChannel")
    @ResponseStatus(HttpStatus.OK)
    public String addLiveStreamChannel(@RequestBody AgoraToken token) {
        return tokenService.addLiveStreamChannel(token);
    }

    //Call the api to retrive the token , channelName and to check whether the streaming is started
    @GetMapping("/{exhibitionId}/{stallId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> GetLiveStreamChannelInfo(@PathVariable String exhibitionId, @PathVariable String stallId) {
        return tokenService.getLiveStreamChannelInfo(exhibitionId, stallId);
    }
    //Call this api when external party joins to the exhibition so it sets the token
    @PutMapping ("/token")
    public String updateLiveStreamChannelInfo(@RequestBody AgoraRepository resource)  {
        return tokenService.updateLiveStreamChannelInfo(resource);
    }

    //Call this api when ending the live stream
    @PutMapping ("/end")
    public String stopLiveStreamChannel(@RequestBody AgoraToken token)  {
        return tokenService.stopLiveStreamChannel(token);
    }



}
