package org.ve.ticket.model;

public class TicketInfo {
    private String exhibitionName;
    private int ticketPrice;
    private String ticketId;

    public TicketInfo(String exhibitionName, int ticketPrice, String ticketId) {
        this.exhibitionName = exhibitionName;
        this.ticketPrice = ticketPrice;
        this.ticketId = ticketId;
    }

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


}
