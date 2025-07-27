package uk.jasondev.huddl.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import uk.jasondev.huddl.dto.SubmissionRequest;
import uk.jasondev.huddl.model.Group;
import uk.jasondev.huddl.model.Option;
import uk.jasondev.huddl.model.PollSubmission;
import uk.jasondev.huddl.model.User;
import uk.jasondev.huddl.model.UserGroupAvailability;
import uk.jasondev.huddl.model.UserGroupBudget;
import uk.jasondev.huddl.model.id.PollSubmissionId;
import uk.jasondev.huddl.model.id.UserGroupAvailabilityId;
import uk.jasondev.huddl.model.id.UserGroupBudgetId;
import uk.jasondev.huddl.repo.OptionRepository;
import uk.jasondev.huddl.repo.PollSubmissionRepository;
import uk.jasondev.huddl.repo.UserGroupAvailabilityRepository;
import uk.jasondev.huddl.repo.UserGroupBudgetRepository;

@Service
public class SubmissionsService {

    @Autowired
    private GroupService groupService;

    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private PollSubmissionRepository pollSubmissionRepository;

    @Autowired
    private UserGroupAvailabilityRepository userGroupAvailabilityRepository;

    @Autowired
    private UserGroupBudgetRepository userGroupBudgetRepository;

    @Transactional
    public void submitForm(SubmissionRequest req, String groupToken) {
        User user = groupService.getCurrentUser();
        Group group = groupService.getGroup(groupToken);

        UserGroupBudget budget = new UserGroupBudget();
        budget.setId(new UserGroupBudgetId(user.getId(), group.getId()));

        budget.setUser(user);
        budget.setGroup(group);
        budget.setBudget(req.budget);
        userGroupBudgetRepository.save(budget);

        for (LocalDate date : req.availability) {
            UserGroupAvailability availability = new UserGroupAvailability();
            availability.setId(new UserGroupAvailabilityId(user.getId(), group.getId(), date));

            availability.setUser(user);
            availability.setGroup(group);
            userGroupAvailabilityRepository.save(availability);
        }

        for (Long choiceId : req.choiceIds) {
            PollSubmission pollSubmission = new PollSubmission();
            Option choice = optionRepository.findById(choiceId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "choice with id" + choiceId + " not found"));

            if (choice.getPoll().getGroup().getId().equals(group.getId())) {
                pollSubmission.setId(new PollSubmissionId(user.getId(), choice.getId()));

                pollSubmission.setUser(user);
                pollSubmission.setPoll(choice.getPoll());
                pollSubmission.setOption(choice);
                pollSubmissionRepository.save(pollSubmission);
            } else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "choice is not in group");
            }
        }
    }
}
