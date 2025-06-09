package com.pavan.billingsoftware.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileUploadService {
    String uploadFile(MultipartFile file);
    boolean deleteFile(String imgUrl);
}
