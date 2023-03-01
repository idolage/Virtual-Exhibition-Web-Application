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
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public String issueTicket(@RequestBody Ticket ticket) throws InterruptedException, ExecutionException {
        return ticketService.issueTicket(ticket);
    }

    @PutMapping ("/{ticketId}")
    public String updateTicket(@PathVariable String ticketId,@RequestBody Ticket ticket) throws InterruptedException, ExecutionException {
        return ticketService.updateTicket(ticket,ticketId);
    }

    @DeleteMapping ("/{ticketId}")
    public String deleteTicket(@PathVariable String ticketId) throws ExecutionException, InterruptedException {
        return ticketService.deleteTicket(ticketId);
    }
}
