package uk.jasondev.huddl.dto;

import java.util.List;

public class PollRequest {
    public String question;
    public boolean isMultipleChoice;
    public List<String> options;
}
