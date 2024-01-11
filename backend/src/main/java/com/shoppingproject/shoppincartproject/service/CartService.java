package com.shoppingproject.shoppincartproject.service;

import com.shoppingproject.shoppincartproject.dto.CartResponseDTO;
import com.shoppingproject.shoppincartproject.model.Cart;
import com.shoppingproject.shoppincartproject.model.Order;
import com.shoppingproject.shoppincartproject.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Cart getCartById(Long cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new NoSuchElementException("Cart not found"));
    }

    public List<CartResponseDTO> getAllCarts() {
        // Fetch all carts with associated orders
        List<Cart> carts = cartRepository.findAll();

        // Convert carts to CartResponseDTO
        return carts.stream()
                .map(cart -> new CartResponseDTO(cart.getId(), cart.getOrders()))
                .collect(Collectors.toList());
    }
    public Cart createCart() {
        Cart cart = new Cart();
        return cartRepository.save(cart);
    }

    public void deleteCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }
    public void addOrderToCart(Long cartId, Order order) {
        Cart cart = getCartById(cartId);
        order.setCart(cart);
        cart.getOrders().add(order);
        cartRepository.save(cart);
    }




}
