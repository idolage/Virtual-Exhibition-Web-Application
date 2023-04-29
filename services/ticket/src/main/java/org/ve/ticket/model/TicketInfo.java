package org.ve.ticket.model;

public class TicketInfo {
    private String exhibitionId;
    private String exhibitionName;
    private int ticketPrice;
    private String ticketId;

    private Boolean isExpired;

    public TicketInfo(String exhibitionId, String exhibitionName, int ticketPrice, String ticketId, Boolean isExpired) {
        this.exhibitionId=exhibitionId;
        this.exhibitionName = exhibitionName;
        this.ticketPrice = ticketPrice;
        this.ticketId = ticketId;
        this.isExpired = isExpired;
    }

    public String getExhibitionId(){return exhibitionId;}

    public void setExhibitionId(String exhibitionId) {this.exhibitionId = exhibitionId;}

    public String getExhibitionName() {
        return exhibitionName;
    }

    public void setExhibitionName(String exhibitionName) {
        this.exhibitionName = exhibitionName;
    }

    public int getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(int ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public String getTicketId() {
        return ticketId;
    }

    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    public Boolean getIsExpired() {
        return isExpired;
    }

    public void setIsExpired(Boolean expired) {
        this.isExpired = isExpired;
    }
}
