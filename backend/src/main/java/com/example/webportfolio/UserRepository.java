package com.example.webportfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserRating,Integer>{
    @Override
    Optional<UserRating> findById(Integer integer);

    @Query(value = "SELECT * FROM user_rating WHERE status = :status ORDER BY updated_at DESC LIMIT 5", nativeQuery = true)
    List<UserRating> dataToBeDisplayed(@Param("status") int status);
}
