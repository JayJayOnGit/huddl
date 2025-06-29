package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import uk.jasondev.huddl.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
}