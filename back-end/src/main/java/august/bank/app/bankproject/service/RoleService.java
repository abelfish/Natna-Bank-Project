package august.bank.app.bankproject.service;


import august.bank.app.bankproject.dto.RoleDto;
import java.util.List;


public interface RoleService {

    List<RoleDto> getRoles();

    RoleDto getRoleById(String id);

    RoleDto addRole(RoleDto roleDto);

    void deleteRole(String id);

    RoleDto updateRole(String id, RoleDto roleDto);





}
