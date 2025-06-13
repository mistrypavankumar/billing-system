package com.pavan.billingsoftware.services.impl;

import com.pavan.billingsoftware.io.item.ItemRequest;
import com.pavan.billingsoftware.io.item.ItemResponse;
import com.pavan.billingsoftware.models.Category;
import com.pavan.billingsoftware.models.ItemEntity;
import com.pavan.billingsoftware.repositories.CategoryRepository;
import com.pavan.billingsoftware.repositories.ItemRepository;
import com.pavan.billingsoftware.services.FileUploadService;
import com.pavan.billingsoftware.services.ItemService;
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
public class ItemServiceImpl implements ItemService {

    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;


    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        Category exisitingCategory =  categoryRepository.findByCategoryId(request.getCategoryId()).orElseThrow(
                () -> new RuntimeException("Category not found: " + request.getCategoryId())
        );

        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem =  convertToEntity(request);
        newItem.setCategory(exisitingCategory);
        newItem.setImgUrl(imgUrl);
        newItem = itemRepository.save(newItem);

        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem =  itemRepository.findByItemId(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
        boolean isFileDelete = fileUploadService.deleteFile(existingItem.getImgUrl());

        if(isFileDelete){
            itemRepository.delete(existingItem);
        }else{
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
        }

    }
}
