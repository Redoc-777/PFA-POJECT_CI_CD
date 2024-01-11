package com.shoppingproject.shoppincartproject.dto;


import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private ProductDTO product;
    private OrderRequest user;
    private int quantity;


}
