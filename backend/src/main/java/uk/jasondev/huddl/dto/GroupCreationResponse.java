package uk.jasondev.huddl.dto;

public class GroupCreationResponse {
    private String token;

    public GroupCreationResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
