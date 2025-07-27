package uk.jasondev.huddl.dto;

import java.time.LocalDate;
import java.util.List;

public class GroupPollResponse {
    private String host;
    private String title;
    private String description;
    private boolean availabilityTracker;
    private boolean budgetTracker;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<PollResponse> polls;

    public GroupPollResponse(String host, String title, String description, boolean availabilityTracker,
            boolean budgetTracker,
            LocalDate startDate, LocalDate endDate, List<PollResponse> polls) {
        this.title = title;
        this.description = description;
        this.availabilityTracker = availabilityTracker;
        this.budgetTracker = budgetTracker;
        this.startDate = startDate;
        this.endDate = endDate;
        this.polls = polls;
    }

    public String getHost() {
        return host;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isAvailabilityTracker() {
        return availabilityTracker;
    }

    public boolean isBudgetTracker() {
        return budgetTracker;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public List<PollResponse> getPolls() {
        return polls;
    }
}
