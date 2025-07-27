package uk.jasondev.huddl.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.jasondev.huddl.dto.GroupPollResponse;
import uk.jasondev.huddl.dto.GroupPreviewResponse;
import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.dto.SubmissionRequest;
import uk.jasondev.huddl.service.GroupService;
import uk.jasondev.huddl.service.SubmissionsService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private SubmissionsService submissionsService;

    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody GroupRequest req) {
        groupService.createGroup(req);
        return ResponseEntity.ok("no way it worked");
    }

    @GetMapping
    public ResponseEntity<List<GroupPreviewResponse>> getUsersGroup() {
        List<GroupPreviewResponse> previews = groupService.getUsersGroup();
        return ResponseEntity.ok(previews);
    }

    @GetMapping("/{inviteToken}")
    public ResponseEntity<GroupPollResponse> getGroupInfo(@PathVariable String inviteToken) {

        GroupPollResponse groupInfoResponse = groupService.getGroupInfo(inviteToken);
        return ResponseEntity.ok(groupInfoResponse);
    }

    @PostMapping("/{groupToken}/responses")
    public ResponseEntity<?> submitForm(@RequestBody SubmissionRequest req, @PathVariable String groupToken) {
        submissionsService.submitForm(req, groupToken);
        return ResponseEntity.ok("submission posted");
    }
}