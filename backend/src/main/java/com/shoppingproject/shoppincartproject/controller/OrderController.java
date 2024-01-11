package com.shoppingproject.shoppincartproject.controller;

import com.shoppingproject.shoppincartproject.dto.OrderRequest;
import com.shoppingproject.shoppincartproject.model.Order;
import com.shoppingproject.shoppincartproject.model.User;
import com.shoppingproject.shoppincartproject.service.OrderService;
import com.shoppingproject.shoppincartproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserService userService;


    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    @PostMapping("/{cartId}")
    public Order createOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
    }
    @PostMapping("/placeOrder")
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequest orderRequest) {
        try {
            User user = new User();
            user.setFirstName(orderRequest.getFirstName());
            user.setLastName(orderRequest.getLastName());
            user.setEmail(orderRequest.getEmail());
            user.setPhone(orderRequest.getPhone());
            user.setAddress(orderRequest.getAddress());
            user = userService.saveUser(user);
            Order order = new Order();
            order.setUser(user);
            orderService.saveOrder(order);

            return ResponseEntity.ok("Order placed successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error placing order: " + e.getMessage());
        }
    }


}
