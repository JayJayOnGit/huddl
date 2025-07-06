package uk.jasondev.huddl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private boolean activityTracker;

    private boolean budgetTracker;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getActivityTracker() {
        return activityTracker;
    }

    public void setActivityTracker(boolean activityTracker) {
        this.activityTracker = activityTracker;
    }

    public boolean getBudgetTracker() {
        return budgetTracker;
    }

    public void setBudgetTracker(boolean budgetTracker) {
        this.budgetTracker = budgetTracker;
    }
}
