package com.pavan.billingsoftware.services.impl;

import com.pavan.billingsoftware.io.category.CategoryRequest;
import com.pavan.billingsoftware.io.category.CategoryResponse;
import com.pavan.billingsoftware.models.Category;
import com.pavan.billingsoftware.repositories.CategoryRepository;
import com.pavan.billingsoftware.repositories.ItemRepository;
import com.pavan.billingsoftware.services.CategoryService;
import com.pavan.billingsoftware.services.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {

        Category exsitingCategory =  categoryRepository.findByName(request.getName());

        if(exsitingCategory != null){
            throw new ResponseStatusException(HttpStatus.CONFLICT, request.getName() + ": is already exist.");
        }

        String imgUrl = fileUploadService.uploadFile(file);

        Category category = convertToEntity(request);
        category.setImgUrl(imgUrl);

        category =  categoryRepository.save(category);
        return convertToResponse(category);

    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse).collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        Category existingCategory =  categoryRepository.findByCategoryId(categoryId).orElseThrow(() -> new RuntimeException("Category not found: " + categoryId));

        if(existingCategory != null){
            fileUploadService.deleteFile(existingCategory.getImgUrl());
            categoryRepository.delete(existingCategory);
        }
    }

    private CategoryResponse convertToResponse(Category category) {

        Integer itemsCount =  itemRepository.countByCategoryId(category.getId());

        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .name(category.getName())
                .description(category.getDescription())
                .bgColor(category.getBgColor())
                .imgUrl(category.getImgUrl())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .items(itemsCount)
                .build();
    }

    private Category convertToEntity(CategoryRequest request) {
        return Category.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }
}
