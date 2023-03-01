package org.ve.avatar.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.ve.avatar.model.Avatar;

public interface AvatarRepository extends MongoRepository<Avatar,String> {

    Avatar findByUserId(String userId);

    void deleteByUserId(String userId);
}
