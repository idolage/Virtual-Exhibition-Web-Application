package org.ve.ticket.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.ve.ticket.dto.*;
import org.ve.ticket.model.Ticket;

import java.util.Objects;
import java.util.concurrent.ExecutionException;

@Service
public class TicketService {
    @Autowired
    private RestTemplate restTemplate;

    public String issueTicket(Ticket ticket) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        ticket.setIsExpired(false); //set expired as false
        DocumentReference documentReference =  firestore.collection("tickets").document(ticket.getTicketId());
        ApiFuture<WriteResult> collectionApiFuture = documentReference.set(ticket);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    public ResponseEntity<?> getTicket(String ticketId)throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("tickets").document(ticketId);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        Ticket ticket;
        if(documentSnapshot.exists()){
            ticket = documentSnapshot.toObject(Ticket.class);
            if(ticket != null){
                Exhibition exhibition = restTemplate
                        .getForObject("http://EXHIBITION-SERVICE/api/exhibitions/"+
                                ticket.getExhibitionId(), Exhibition.class);
                if(exhibition == null){
                    return new ResponseEntity<>("No exhibition found",HttpStatus.NOT_FOUND);
                }
                if(Objects.equals(ticket.getUserType(), "ATTENDEE")){
                    Attendee attendee = restTemplate
                            .getForObject("http://AUTH-SERVICE/api/auth/getAttendee/"+
                                    ticket.getUserId(), Attendee.class);
                    if(attendee == null){
                        return new ResponseEntity<>("No attendee found",HttpStatus.NOT_FOUND);
                    }
                    TicketResponseAttendee ticketResponseAttendee = new TicketResponseAttendee(
                            ticket.getTicketId(),
                            exhibition,
                            attendee,
                            ticket.getIsExpired()
                    );
                    return new ResponseEntity<>(ticketResponseAttendee, HttpStatus.OK);
                } else if(Objects.equals(ticket.getUserType(), "EXHIBITOR")){
                    Exhibitor exhibitor = restTemplate
                            .getForObject("http://AUTH-SERVICE/api/auth/getExhibitor/"+
                                    ticket.getUserId(), Exhibitor.class);
                    if(exhibitor == null){
                        return new ResponseEntity<>("No exhibitor found",HttpStatus.NOT_FOUND);
                    }
                    TicketResponseExhibitor ticketResponseExhibitor = new TicketResponseExhibitor(
                            ticket.getTicketId(),
                            exhibition,
                            exhibitor,
                            ticket.getIsExpired()
                    );
                    return new ResponseEntity<>(ticketResponseExhibitor, HttpStatus.OK);
                } else if(Objects.equals(ticket.getUserType(), "EX_OWNER")){
                    ExhibitionOwner exhibitionOwner = restTemplate
                            .getForObject("http://AUTH-SERVICE/api/auth/getExhibitionOwner/"+
                                    ticket.getUserId(), ExhibitionOwner.class);
                    if(exhibitionOwner == null){
                        return new ResponseEntity<>("No exhibition owner found",HttpStatus.NOT_FOUND);
                    }
                    TicketResponseExhibitionOwner ticketResponseExhibitionOwner = new TicketResponseExhibitionOwner(
                            ticket.getTicketId(),
                            exhibition,
                            exhibitionOwner,
                            ticket.getIsExpired()
                    );
                    return new ResponseEntity<>(ticketResponseExhibitionOwner, HttpStatus.OK);
                }
            }
        }
        return new ResponseEntity<>("No ticket found",HttpStatus.NOT_FOUND);
    }

    public String updateTicket(String ticketId, Boolean isExpired) throws InterruptedException, ExecutionException{
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection("tickets").document(ticketId);
        ApiFuture<DocumentSnapshot> documentSnapshotApiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = documentSnapshotApiFuture.get();
        Ticket ticket = documentSnapshot.toObject(Ticket.class);
        if(ticket!=null){
            ticket.setIsExpired(isExpired);
            ApiFuture<WriteResult> collectionApiFuture = firestore.collection("tickets")
                    .document(ticketId).set(ticket);
            if(isExpired){
                return "Ticket is expired";
            } else {
                return "Ticket is valid";
            }
        }
        else{
            return "Ticket not found";
        }
    }

    public String deleteTicket(String ticketId) throws InterruptedException, ExecutionException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = firestore.collection("tickets")
                .document(ticketId).delete();
        return "Successfully deleted "+ticketId;
    }
}
