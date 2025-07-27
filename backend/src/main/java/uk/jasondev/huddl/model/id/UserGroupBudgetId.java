package uk.jasondev.huddl.model.id;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserGroupBudgetId implements Serializable {
    private Long userId;
    private Long groupId;

    public UserGroupBudgetId() {
    }

    public UserGroupBudgetId(Long userId, Long groupId) {
        this.userId = userId;
        this.groupId = groupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof UserGroupBudgetId))
            return false;
        UserGroupBudgetId that = (UserGroupBudgetId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(groupId, that.groupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, groupId);
    }
}
