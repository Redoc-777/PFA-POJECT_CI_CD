package com.shoppingproject.shoppincartproject.dto;

import com.shoppingproject.shoppincartproject.model.Order;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CartResponseDTO {
    private Long id;
    private List<Order> orders;
}
