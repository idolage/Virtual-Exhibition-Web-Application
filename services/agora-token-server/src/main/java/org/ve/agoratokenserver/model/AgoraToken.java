package org.ve.agoratokenserver.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private Boolean isStarted;

}
