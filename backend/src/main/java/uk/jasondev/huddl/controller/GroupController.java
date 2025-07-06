package uk.jasondev.huddl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uk.jasondev.huddl.dto.GroupRequest;
import uk.jasondev.huddl.service.GroupService;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @PostMapping
    public ResponseEntity<?> createGroup(@RequestBody GroupRequest req) {

        groupService.createGroup(req);
        return ResponseEntity.ok("no way it worked");
    }
}