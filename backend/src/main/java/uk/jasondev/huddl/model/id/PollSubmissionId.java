package uk.jasondev.huddl.model.id;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class PollSubmissionId implements Serializable {
    private Long userId;
    private Long optionId;

    public PollSubmissionId() {
    }

    public PollSubmissionId(Long userId, Long optionId) {
        this.userId = userId;
        this.optionId = optionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof PollSubmissionId))
            return false;
        PollSubmissionId that = (PollSubmissionId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(optionId, that.optionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, optionId);
    }
}
