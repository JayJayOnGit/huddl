package uk.jasondev.huddl.dto;

import java.util.Map;

public class PollResponse {
    private String question;
    private boolean isMultipleChoice;
    private Map<Long, String> options;

    public PollResponse(String question, boolean isMultipleChoice, Map<Long, String> options) {
        this.question = question;
        this.isMultipleChoice = isMultipleChoice;
        this.options = options;
    }

    public String getQuestion() {
        return question;
    }

    public boolean getIsMultipleChoice() {
        return isMultipleChoice;
    }

    public Map<Long, String> getOptions() {
        return options;
    }
}