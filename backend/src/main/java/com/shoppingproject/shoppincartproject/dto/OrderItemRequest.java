package com.shoppingproject.shoppincartproject.dto;

import lombok.*;

@Data

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemRequest {
    private ProductDTO product;
    private int quantity;
}