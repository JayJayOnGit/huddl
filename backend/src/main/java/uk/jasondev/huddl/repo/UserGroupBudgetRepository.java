package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.UserGroupBudget;
import uk.jasondev.huddl.model.id.UserGroupBudgetId;

@Repository
public interface UserGroupBudgetRepository extends JpaRepository<UserGroupBudget, UserGroupBudgetId> {

}
