package uk.jasondev.huddl.dto;

import java.util.List;

public class PollResponse {
    private String question;
    private boolean isMultipleChoice;
    private List<String> options;

    public PollResponse(String question, boolean isMultipleChoice, List<String> options) {
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

    public List<String> getOptions() {
        return options;
    }
}