package org.ve.feedback.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.ve.feedback.model.Feedback;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback,String> {
    List<Feedback> findByExhibitionId(String exhibitionId);
    List<Feedback> findByUserRole(String userRole);
    List<Feedback> findByType(String type);
}
