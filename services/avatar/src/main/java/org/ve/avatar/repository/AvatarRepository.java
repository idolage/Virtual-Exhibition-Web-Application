package org.ve.avatar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.ve.avatar.model.Avatar;

public interface AvatarRepository extends JpaRepository<Avatar,Integer> {







    Avatar findByUserId(String userId);

    void deleteByUserId(String userId);
}
