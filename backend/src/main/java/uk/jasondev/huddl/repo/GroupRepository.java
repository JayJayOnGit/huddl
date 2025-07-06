package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

}
