package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.UserGroupBudget;

@Repository
public interface UserGroupBudgetRepository extends JpaRepository<UserGroupBudget, Long> {

}
