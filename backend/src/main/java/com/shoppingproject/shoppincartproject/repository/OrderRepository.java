package com.shoppingproject.shoppincartproject.repository;

import com.shoppingproject.shoppincartproject.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
