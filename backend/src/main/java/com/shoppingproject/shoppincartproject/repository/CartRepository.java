package com.shoppingproject.shoppincartproject.repository;

import com.shoppingproject.shoppincartproject.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
