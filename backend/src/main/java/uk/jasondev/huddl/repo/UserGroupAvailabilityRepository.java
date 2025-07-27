package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.UserGroupAvailability;

@Repository
public interface UserGroupAvailabilityRepository extends JpaRepository<UserGroupAvailability, Long> {

}
