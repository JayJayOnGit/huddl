package uk.jasondev.huddl.dto;

import java.time.LocalDate;

public class GroupPreviewResponse {
    private String host;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String token;

    public GroupPreviewResponse(String host, String title, String description, LocalDate startDate, LocalDate endDate,
            String token) {
        this.host = host;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.token = token;
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public String getToken() {
        return token;
    }
}
