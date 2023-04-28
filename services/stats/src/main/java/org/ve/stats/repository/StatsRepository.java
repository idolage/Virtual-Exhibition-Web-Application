package org.ve.stats.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.ve.stats.model.Stats;

import java.util.List;

@Repository
public interface StatsRepository extends MongoRepository<Stats,String> {
    List<Stats> findByExhibitionId(String exhibitionId);
}
