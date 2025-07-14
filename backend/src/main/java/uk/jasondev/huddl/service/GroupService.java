package uk.jasondev.huddl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.model.Group;
import uk.jasondev.huddl.model.Option;
import uk.jasondev.huddl.model.Poll;
import uk.jasondev.huddl.model.User;
import uk.jasondev.huddl.repo.GroupRepository;
import uk.jasondev.huddl.repo.UserRepository;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void createGroup(GroupRequest req) {
        Group group = new Group();

        group.setTitle(req.title);
        group.setDescription(req.description);
        group.setActivityTracker(req.availabiltiyTracker);
        group.setBudgetTracker(req.budgetTracker);
        group.setStartDate(req.startDate);
        group.setEndDate(req.endDate);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        group.getUsers().add(user);

        for (Poll poll : group.getPolls()) {
            poll.setGroup(group);

            for (Option option : poll.getOptions()) {
                option.setPoll(poll);
                poll.getOptions().add(option);
            }

            group.getPolls().add(poll);
        }

        groupRepository.save(group);
    }
}