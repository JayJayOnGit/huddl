package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.UserGroupAvailability;
import uk.jasondev.huddl.model.id.UserGroupAvailabilityId;

@Repository
public interface UserGroupAvailabilityRepository extends JpaRepository<UserGroupAvailability, UserGroupAvailabilityId> {

}
