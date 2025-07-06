package uk.jasondev.huddl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.jasondev.huddl.dto.AuthRequest;
import uk.jasondev.huddl.dto.AuthResponse;
import uk.jasondev.huddl.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest req) {
        String jwt = userService.registerUser(req);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest req) {
        String jwt = userService.loginUser(req);

        return ResponseEntity.ok(new AuthResponse(jwt));
    }

}