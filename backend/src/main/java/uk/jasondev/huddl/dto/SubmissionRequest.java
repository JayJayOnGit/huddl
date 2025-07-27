package uk.jasondev.huddl.dto;

import java.time.LocalDate;

public class SubmissionRequest {
    public LocalDate[] availability;
    public Long budget;
    public Long[] choiceIds;
}
