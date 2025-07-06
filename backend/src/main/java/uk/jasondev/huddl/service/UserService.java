package uk.jasondev.huddl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import uk.jasondev.huddl.dto.AuthRequest;
import uk.jasondev.huddl.model.User;
import uk.jasondev.huddl.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;

    public String registerUser(AuthRequest req) {
        if (userRepository.existsByUsername(req.username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "username already exists");
        }

        User user = new User();

        user.setUsername(req.username);
        user.setPassword(passwordEncoder.encode(req.password));
        userRepository.save(user);

        return jwtService.generateToken(req.username);
    }

    public String loginUser(AuthRequest req) {
        User user = userRepository.findByUsername(req.username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "username not found"));

        if (!passwordEncoder.matches(req.password, user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid password");
        }

        return jwtService.generateToken(req.username);
    }
}
