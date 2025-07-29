package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.PollSubmission;
import uk.jasondev.huddl.model.id.PollSubmissionId;

@Repository
public interface PollSubmissionRepository extends JpaRepository<PollSubmission, PollSubmissionId> {

}
