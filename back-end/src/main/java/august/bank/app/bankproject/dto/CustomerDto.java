package august.bank.app.bankproject.dto;

import java.util.List;

import august.bank.app.bankproject.entity.Account;
import august.bank.app.bankproject.entity.Transaction;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CustomerDto {

    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String username;


    private List<Account> accounts;


}
