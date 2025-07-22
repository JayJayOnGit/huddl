package uk.jasondev.huddl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.jasondev.huddl.service.GroupService;

@RestController
@RequestMapping("/api/invite")
public class InviteController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/{inviteToken}")
    public ResponseEntity<?> getGroupInfo(@PathVariable String inviteToken) {

        groupService.addUserToGroup(inviteToken);

        return ResponseEntity.ok().body("added to group");
    }
}
