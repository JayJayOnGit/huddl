package uk.jasondev.huddl.model.id;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserGroupAvailabilityId implements Serializable {
    private Long userId;
    private Long groupId;
    private LocalDate date;

    public UserGroupAvailabilityId() {
    }

    public UserGroupAvailabilityId(Long userId, Long groupId, LocalDate date) {
        this.userId = userId;
        this.groupId = groupId;
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof UserGroupAvailabilityId))
            return false;
        UserGroupAvailabilityId that = (UserGroupAvailabilityId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(groupId, that.groupId) &&
                Objects.equals(date, that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, groupId, date);
    }
}
