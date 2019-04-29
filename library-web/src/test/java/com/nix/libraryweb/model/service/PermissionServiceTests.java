package com.nix.libraryweb.model.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.nix.libraryweb.exceptions.EntityNotFoundException;
import com.nix.libraryweb.model.entity.Permission;
import com.nix.libraryweb.model.repository.PermissionRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PermissionServiceTests {
    private final static String PERMISSION_NAME = "arbitraty";

    @MockBean
    private PermissionRepository permissionRepository;


    @Autowired
    private PermissionService permissionService;

    @Test
    public void testFindPermission() {
        Permission expectedPermission = createPermission();
        when(permissionRepository.findByName(PERMISSION_NAME)).thenReturn(Optional.of(expectedPermission));
        String actualPermissionName = permissionService.findPermissionByName(PERMISSION_NAME).getName();
        verify(permissionRepository).findByName(PERMISSION_NAME);
        assertEquals("The expected and actual permission names are not the same", PERMISSION_NAME, actualPermissionName);

    }

    @Test(expected = EntityNotFoundException.class)
    public void testNotFoundException() {
        when(permissionRepository.findByName(anyString())).thenReturn(Optional.empty());
        permissionService.findPermissionByName(PERMISSION_NAME);

    }

    private Permission createPermission() {
        Permission permission = new Permission();
        permission.setName(PERMISSION_NAME);
        return permission;
    }
}
