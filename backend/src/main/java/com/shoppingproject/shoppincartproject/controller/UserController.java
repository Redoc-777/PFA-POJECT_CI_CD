package com.shoppingproject.shoppincartproject.controller;

import com.shoppingproject.shoppincartproject.dto.ProductDTO;
import com.shoppingproject.shoppincartproject.dto.OrderDTO;
import com.shoppingproject.shoppincartproject.dto.OrderRequest;
import com.shoppingproject.shoppincartproject.model.Order;
import com.shoppingproject.shoppincartproject.model.Product;
import com.shoppingproject.shoppincartproject.model.User;
import com.shoppingproject.shoppincartproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
    @GetMapping("/allWithOrders")
    public List<OrderRequest> getAllUsersWithOrders() {
        List<User> users = userService.getAllUsersWithOrders();
        return users.stream()
                .map(this::convertToUserWithOrdersDTO)
                .collect(Collectors.toList());
    }

    private OrderRequest convertToUserWithOrdersDTO(User user) {
        OrderRequest userWithOrdersDTO = new OrderRequest();
        userWithOrdersDTO.setId(user.getId());
        userWithOrdersDTO.setFirstName(user.getFirstName());
        userWithOrdersDTO.setLastName(user.getLastName());
        userWithOrdersDTO.setEmail(user.getEmail());
        userWithOrdersDTO.setPhone(user.getPhone());  // Assuming you have a 'phone' field in your User entity
        userWithOrdersDTO.setAddress(user.getAddress());

        // Assuming you have a method to convert a list of Order entities to OrderDTOs
        userWithOrdersDTO.setOrders(convertToOrderDTOList(user.getOrders()));

        return userWithOrdersDTO;
    }

    private List<OrderDTO> convertToOrderDTOList(List<Order> orders) {
        return orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }

    private OrderDTO convertToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();

        // Check if the 'product' in the order is not null before accessing its properties
        if (order.getProduct() != null) {
            // Assuming you have a method to convert Product entity to ProductDTO
            orderDTO.setProduct(convertToProductDTO(order.getProduct()));
        }

        orderDTO.setQuantity(order.getQuantity());
        // Add other necessary fields

        return orderDTO;
    }

    private ProductDTO convertToProductDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();

        // Check if 'product' is not null before accessing its properties
        if (product != null) {
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setDescription(product.getDescription());
            productDTO.setPrice(product.getPrice());
            productDTO.setImageUrl(product.getImageUrl());
            // Map other fields as needed
        }

        return productDTO;
    }


}
