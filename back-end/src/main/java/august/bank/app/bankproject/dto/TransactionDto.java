package august.bank.app.bankproject.dto;

import august.bank.app.bankproject.entity.Customer;
import august.bank.app.bankproject.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TransactionDto {
    @Id
    private String id;

    private LocalDateTime dateTime;

    private String number;


    private Double amount;


    private String type;

    private String from;

    private String to;

    private Double balance;
}
