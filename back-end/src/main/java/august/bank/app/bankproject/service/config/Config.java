package august.bank.app.bankproject.service.config;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "august.bank.app.bankproject.repository")
public class Config extends AbstractMongoClientConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();

    }

    @Override
    protected String getDatabaseName() {
        return "AugustBank";
    }
}
