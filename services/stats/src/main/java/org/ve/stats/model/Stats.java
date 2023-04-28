package org.ve.stats.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "stats")
public class Stats {
    @Id
    private String id;
    private String exhibitionId;
    private LocalTime startTime;
    private int duration;
}
