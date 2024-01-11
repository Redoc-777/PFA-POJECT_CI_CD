package com.shoppingproject.shoppincartproject.repository;

import com.shoppingproject.shoppincartproject.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
