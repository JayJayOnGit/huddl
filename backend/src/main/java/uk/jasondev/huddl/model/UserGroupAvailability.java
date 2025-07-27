package uk.jasondev.huddl.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import uk.jasondev.huddl.model.id.UserGroupAvailabilityId;

@Entity
@Table(name = "user_group_availability")
public class UserGroupAvailability {
    @EmbeddedId
    private UserGroupAvailabilityId id;

    @ManyToOne(optional = false)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @MapsId("groupId")
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    public UserGroupAvailabilityId getId() {
        return id;
    }

    public void setId(UserGroupAvailabilityId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }
}
