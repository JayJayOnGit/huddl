package uk.jasondev.huddl.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import uk.jasondev.huddl.model.id.PollSubmissionId;

@Entity
@Table(name = "poll_submissions")
public class PollSubmission {
    @EmbeddedId
    private PollSubmissionId id;

    @ManyToOne(optional = false)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @MapsId("optionId")
    @JoinColumn(name = "option_id", nullable = false)
    private Option option;

    @ManyToOne(optional = false)
    @JoinColumn(name = "poll_id", nullable = false)
    private Poll poll;

    public PollSubmissionId getId() {
        return id;
    }

    public void setId(PollSubmissionId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    public Option getOption() {
        return option;
    }

    public void setOption(Option option) {
        this.option = option;
    }
}
