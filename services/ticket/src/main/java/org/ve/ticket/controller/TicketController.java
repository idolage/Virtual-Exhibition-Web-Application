package org.ve.ticket.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.ve.ticket.model.Ticket;
import org.ve.ticket.model.TicketInfo;
import org.ve.ticket.service.TicketService;

import java.util.List;
import java.util.concurrent.CancellationException;
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

    @GetMapping ("/{ticketId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getTicket(@PathVariable String ticketId) throws InterruptedException, ExecutionException{
        return ticketService.getTicket(ticketId);
    }

    @GetMapping("getTicketInfo/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public List<TicketInfo> getTicketInfo(@PathVariable String userId) throws InterruptedException, ExecutionException {
        return ticketService.getTickets(userId);
    }
    @PutMapping ("/{ticketId}")
    public String updateTicket(@PathVariable String ticketId, @RequestParam boolean isExpired) throws InterruptedException, ExecutionException {
        return ticketService.updateTicket(ticketId, isExpired);
    }

    @DeleteMapping ("/{ticketId}")
    public String deleteTicket(@PathVariable String ticketId) throws ExecutionException, InterruptedException {
        return ticketService.deleteTicket(ticketId);
    }

    @GetMapping ("validate/{ticketId}")
    @ResponseStatus(HttpStatus.OK)
    public Boolean validateTicket(@PathVariable String ticketId) throws InterruptedException, ExecutionException{
        return ticketService.validateTicket(ticketId);
    }

    @PutMapping ("/expireTickets/{exhibitionId}")
    public String expireTickets(@PathVariable String exhibitionId) throws InterruptedException, ExecutionException {
        return ticketService.expireTickets(exhibitionId);
    }
}
