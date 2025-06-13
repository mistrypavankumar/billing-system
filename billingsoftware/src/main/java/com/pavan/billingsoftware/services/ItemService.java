package com.pavan.billingsoftware.services;

import com.pavan.billingsoftware.io.item.ItemRequest;
import com.pavan.billingsoftware.io.item.ItemResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);
}
