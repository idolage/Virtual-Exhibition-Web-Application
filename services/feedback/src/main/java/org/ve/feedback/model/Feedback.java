package org.ve.feedback.model;

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
@Document(collection = "feedback")
public class Feedback {
    @Id
    private String id;
    private String exhibitionId;
    private String feedback;
    private String userRole;
    private String type;
}
