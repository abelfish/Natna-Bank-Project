package august.bank.app.bankproject.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import august.bank.app.bankproject.entity.Customer;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {

    List<Customer> findAll();


    Customer findByUsername(String username);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}