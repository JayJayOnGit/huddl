package uk.jasondev.huddl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.jasondev.huddl.dto.GroupInfoResponse;
import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.service.GroupService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody GroupRequest req) {
        System.out.print(req);

        groupService.createGroup(req);
        return ResponseEntity.ok("no way it worked");
    }

    @GetMapping("/info/{inviteToken}")
    public ResponseEntity<GroupInfoResponse> getGroupInfo(@PathVariable String inviteToken) {

        GroupInfoResponse groupInfoResponse = groupService.getGroupInfo(inviteToken);
        return ResponseEntity.ok(groupInfoResponse);
    }
}