package org.ve.payment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.ve.payment.model.Payment;

@Repository
public interface PaymentRepository extends MongoRepository<Payment,String> {
}
