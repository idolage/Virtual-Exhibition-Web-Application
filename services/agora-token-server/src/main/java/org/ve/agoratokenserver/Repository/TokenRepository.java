package org.ve.agoratokenserver.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.ve.agoratokenserver.model.AgoraToken;

public interface TokenRepository extends MongoRepository<AgoraToken,String> {


    AgoraToken findByExhibitionIdAndStallId(String exhibitionId, String stallId);
}
