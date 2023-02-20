package org.ve.ticket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.ve.ticket.model.Ticket;
import org.ve.ticket.service.TicketService;

import java.util.concurrent.ExecutionException;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;
    @PostMapping("/api/tickets/issue")
    @ResponseStatus(HttpStatus.OK)
    public String issueTicket(@RequestBody Ticket ticket) throws InterruptedException, ExecutionException {
        return ticketService.issueTicket(ticket);
    }

    @PutMapping ("/api/tickets/update/{ticketId}")
    public String updateTicket(@RequestBody Ticket ticket, @PathVariable String ticketId) throws InterruptedException, ExecutionException {
        return ticketService.updateTicket(ticket,ticketId);
    }

    @DeleteMapping ("/api/tickets/delete/{ticketId}")
    public String deleteTicket(@PathVariable String ticketId) throws ExecutionException, InterruptedException {
        return ticketService.deleteTicket(ticketId);
    }
}
