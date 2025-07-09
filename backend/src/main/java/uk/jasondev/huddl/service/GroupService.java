package uk.jasondev.huddl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.model.Group;
import uk.jasondev.huddl.model.User;
import uk.jasondev.huddl.repo.GroupRepository;
import uk.jasondev.huddl.repo.UserRepository;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    public void createGroup(GroupRequest req) {
        Group group = new Group();

        group.setTitle(req.title);
        group.setDescription(req.description);
        group.setActivityTracker(req.availabiltiyTracker);
        group.setBudgetTracker(req.budgetTracker);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        group.getUsers().add(user);

        groupRepository.save(group);
    }
}