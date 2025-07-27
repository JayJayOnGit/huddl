package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.PollSubmission;

@Repository
public interface PollSubmissionRepository extends JpaRepository<PollSubmission, Long> {

}
