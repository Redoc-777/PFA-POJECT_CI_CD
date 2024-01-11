package com.shoppingproject.shoppincartproject.dto;


import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class OrderRequest {
    private Long id;
    private Long productId;
    private String firstName;
    private String lastName;
    private String email;
    private Long phone;
    private String address;
    private List<OrderDTO> orders;
}
