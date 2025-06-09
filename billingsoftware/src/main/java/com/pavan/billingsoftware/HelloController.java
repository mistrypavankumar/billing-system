package com.pavan.billingsoftware;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String greet(){
        return "Welcome to Payvya - The Smartest way to pay";
    }
}
