package uk.jasondev.huddl.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uk.jasondev.huddl.model.Option;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {

}
