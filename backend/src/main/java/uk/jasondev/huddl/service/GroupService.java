package uk.jasondev.huddl.service;

import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.UUID;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.dto.PollRequest;
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
        String inviteToken = generateInviteToken();

        group.setInviteToken(inviteToken);
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

        for (PollRequest pollRequest : req.polls) {

            System.out.println(pollRequest.question);

            Poll poll = new Poll();
            poll.setQuestion(pollRequest.question);
            poll.setIsMultipleChoice(pollRequest.isMultipleChoice);

            for (String optionRequest : pollRequest.options) {
                Option option = new Option();
                option.setText(optionRequest);

                option.setPoll(poll);
                poll.getOptions().add(option);
            }

            poll.setGroup(group);
            group.getPolls().add(poll);
        }

        groupRepository.save(group);
    }

    public String generateInviteToken() {
        UUID uuid = UUID.randomUUID();
        ByteBuffer buffer = ByteBuffer.wrap(new byte[16]);
        buffer.putLong(uuid.getMostSignificantBits());
        buffer.putLong(uuid.getLeastSignificantBits());

        return Base64.getUrlEncoder().withoutPadding().encodeToString(buffer.array());
    }
}