package org.ve.agoratokenserver.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "liveStreamTokens")
public class AgoraToken {
    @Id
    private String id;
    private String stallId;
    private String exhibitionId;

    private String channelName;

    private String token;

    private LocalDateTime session1;
    private LocalDateTime session2;
    private LocalDateTime session3;

    private Boolean isStarted;

}
