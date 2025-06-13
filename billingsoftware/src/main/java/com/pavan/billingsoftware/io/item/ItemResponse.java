package com.pavan.billingsoftware.io.item;


import com.pavan.billingsoftware.models.Category;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {
    private String itemId;
    private String name;
    private BigDecimal price;
    private String description;
    private String imgUrl;
    private String categoryId;
    private String categoryName;

    private Timestamp updatedAt;
    private Timestamp createdAt;
}
