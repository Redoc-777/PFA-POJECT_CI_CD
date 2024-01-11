package com.shoppingproject.shoppincartproject.repository;

import com.shoppingproject.shoppincartproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.orders o LEFT JOIN FETCH o.product")
    List<User> findAllWithOrders();
}
