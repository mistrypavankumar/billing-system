package com.pavan.billingsoftware.services;

import com.pavan.billingsoftware.io.user.UserRequest;
import com.pavan.billingsoftware.io.user.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> getUsers();

    void deleteUser(String id);


}
