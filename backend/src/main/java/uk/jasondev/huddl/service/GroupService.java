package uk.jasondev.huddl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.model.Group;
import uk.jasondev.huddl.repo.GroupRepository;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public void createGroup(GroupRequest req) {
        Group group = new Group();

        group.setTitle(req.title);
        group.setDescription(req.description);
        group.setActivityTracker(req.availabiltiyTracker);
        group.setBudgetTracker(req.budgetTracker);

        groupRepository.save(group);
    }
}