package com.pavan.billingsoftware.controllers;


import com.pavan.billingsoftware.io.user.UserRequest;
import com.pavan.billingsoftware.io.user.UserResponse;
import com.pavan.billingsoftware.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest request){
        try{
            return userService.createUser(request);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to register a user");
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/users")
    public List<UserResponse> getUsers(){
        return userService.getUsers();
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

}
