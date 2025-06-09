package com.pavan.billingsoftware.services;

import com.pavan.billingsoftware.io.category.CategoryRequest;
import com.pavan.billingsoftware.io.category.CategoryResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface CategoryService {
    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
