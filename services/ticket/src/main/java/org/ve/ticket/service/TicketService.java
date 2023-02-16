package org.ve.ticket.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.ve.ticket.model.Ticket;

import java.util.UUID;
import java.util.concurrent.ExecutionException;
@Service
public class TicketService {
    public String issueTicket(Ticket ticket) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        ticket.setIsExpired(false); // ticket is set to 'not expired' by default.
        UUID uuid = UUID.randomUUID(); //generates a random UUID as the ticket id for now.(fetch it from the payments service)
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("tickets")
                .document(String.valueOf(uuid)).set(ticket);
        return collectionApiFuture.get().getUpdateTime().toString();
    }
    public String updateTicket(Ticket ticket, String ticketId)throws InterruptedException, ExecutionException{
        JSONObject obj=new JSONObject();
        obj.put("exhibitionId",ticket.getExhibitionId());
        obj.put("userId",ticket.getUserId());
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("tickets")
                .document(ticketId).update(obj);
        return "Updated "+collectionApiFuture.get().getUpdateTime().toString();
    }
    public String deleteTicket(String ticketId) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("tickets")
                .document(ticketId).delete();
        return "Successfully deleted "+ticketId;
    }
}
