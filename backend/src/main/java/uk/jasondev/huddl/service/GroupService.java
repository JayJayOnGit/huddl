package uk.jasondev.huddl.service;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import uk.jasondev.huddl.dto.GroupPollResponse;
import uk.jasondev.huddl.dto.GroupPreviewResponse;
import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.dto.PollRequest;
import uk.jasondev.huddl.dto.PollResponse;
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

    public List<GroupPreviewResponse> getUsersGroup() {
        User user = getCurrentUser();
        Set<Group> groups = user.getGroups();
        List<GroupPreviewResponse> previews = new ArrayList<>();

        for (Group group : groups) {
            previews.add(new GroupPreviewResponse(group.getHost().getUsername(), group.getTitle(),
                    group.getDescription(), group.getStartDate(), group.getEndDate(), group.getInviteToken()));
        }

        return previews;
    }

    @Transactional
    public void createGroup(GroupRequest req) {
        Group group = new Group();
        String inviteToken = generateInviteToken();

        group.setInviteToken(inviteToken);
        group.setTitle(req.title);
        group.setDescription(req.description);
        group.setActivityTracker(req.availabilityTracker);
        group.setBudgetTracker(req.budgetTracker);
        group.setStartDate(req.startDate);
        group.setEndDate(req.endDate);

        User user = getCurrentUser();

        group.setHost(user);
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

    public void addUserToGroup(String inviteToken) {
        Group group = getGroup(inviteToken);
        User user = getCurrentUser();

        if (!group.getUsers().contains(user)) {
            group.getUsers().add(user);
            groupRepository.save(group);
        }
    }

    public GroupPollResponse getGroupInfo(String inviteToken) {
        Group group = getGroup(inviteToken);
        User user = getCurrentUser();

        if (!group.getUsers().contains(user)) {
            // TODO: add user for easier link sharing
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "user not in group");
        }

        List<Poll> polls = group.getPolls();
        List<PollResponse> pollResponses = new ArrayList<>();

        for (Poll poll : polls) {
            Map<Long, String> options = poll.getOptions().stream()
                    .collect(Collectors.toMap(option -> option.getId(), option -> option.getText()));

            pollResponses.add(new PollResponse(poll.getQuestion(), poll.getIsMultipleChoice(), options));
        }

        return new GroupPollResponse(group.getHost().getUsername(), group.getTitle(), group.getDescription(),
                group.getActivityTracker(),
                group.getBudgetTracker(), group.getStartDate(), group.getEndDate(), pollResponses);
    }

    public User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user;
    }

    public Group getGroup(String token) {
        Group group = groupRepository.findByInviteToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "invite token not found"));

        return group;
    }

    public String generateInviteToken() {
        UUID uuid = UUID.randomUUID();
        ByteBuffer buffer = ByteBuffer.wrap(new byte[16]);
        buffer.putLong(uuid.getMostSignificantBits());
        buffer.putLong(uuid.getLeastSignificantBits());

        return Base64.getUrlEncoder().withoutPadding().encodeToString(buffer.array());
    }
}