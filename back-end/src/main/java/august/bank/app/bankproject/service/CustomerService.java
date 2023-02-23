package august.bank.app.bankproject.service;

import august.bank.app.bankproject.dto.AccountDto;
import august.bank.app.bankproject.dto.CustomerDto;

import java.util.List;

public interface CustomerService {

    List<CustomerDto> getAllCustomers();
    CustomerDto getCustomerById(String id);
    CustomerDto saveCustomer(CustomerDto customer);
    CustomerDto updateCustomer(String id, CustomerDto customer);
    void deleteCustomer(String id);


    List<AccountDto> getAllAccounts(String id);

    void addAccountToCustomer(String customerId, AccountDto accountDto);

    void deleteAccountFromCustomer(String customerId, String accountId);


    CustomerDto getCustomerByUsername(String username);
}
