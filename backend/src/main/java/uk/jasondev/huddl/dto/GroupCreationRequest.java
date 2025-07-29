package uk.jasondev.huddl.dto;

import java.time.LocalDate;
import java.util.List;

public class GroupCreationRequest {
    public String title;
    public String description;
    public boolean availabilityTracker;
    public boolean budgetTracker;
    public LocalDate startDate;
    public LocalDate endDate;
    public List<PollRequest> polls;
}
