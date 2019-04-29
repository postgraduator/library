package com.nix.libraryweb.model.service;

import static com.nix.libraryweb.security.constants.LibraryRole.ADMIN;
import static com.nix.libraryweb.security.constants.LibraryRole.VISITOR;
import static org.apache.commons.lang3.StringUtils.EMPTY;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;
import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import com.nix.libraryweb.exceptions.EntityNotFoundException;
import com.nix.libraryweb.model.entity.LibraryUser;
import com.nix.libraryweb.model.entity.Permission;
import com.nix.libraryweb.model.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTests {
    private final static String USER_NAME = "arbitrary";
    private final static String USER_PASSWORD = "password";

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PermissionService permissionService;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Test
    public void testFindByName() {
        when(userRepository.findByName(USER_NAME)).thenReturn(any());
        userService.getSecurityUserByName(USER_NAME);
        verify(userRepository).findByName(USER_NAME);
    }

    @Test
    public void testNewUserPermission() {
        Permission visitorPermission = createVisitorPermission();
        LibraryUser libraryUser = createVisitorLibraryUser();
        when(permissionService.findPermissionByName(VISITOR)).thenReturn(visitorPermission);
        when(userRepository.save(libraryUser)).thenReturn(libraryUser);
        LibraryUser newLibraryUser = userService.createUser(libraryUser);
        verify(permissionService).findPermissionByName(VISITOR);
        assertEquals("A new user must have VISITOR permission", VISITOR, newLibraryUser.getPermission().getName());
    }

    @Test
    public void testPasswordEncodingForNewUser() {
        LibraryUser libraryUser = createVisitorLibraryUser();
        when(userRepository.save(libraryUser)).thenReturn(libraryUser);
        LibraryUser newLibraryUser = userService.createUser(libraryUser);
        assertTrue("The password was not encoded", passwordEncoder.matches(USER_PASSWORD, newLibraryUser.getPassword()));
    }

    @Test
    public void testUpdateUserWithNewPassword() {
        LibraryUser libraryUser = createVisitorLibraryUser();
        when(userRepository.save(libraryUser)).thenReturn(libraryUser);
        LibraryUser updatedUser = userService.updateUser(any(UUID.class), libraryUser);
        verify(userRepository, never()).findById(any(UUID.class));
        assertTrue("The password was not encoded", passwordEncoder.matches(USER_PASSWORD, updatedUser.getPassword()));
    }

    @Test
    public void testUpdateWithCurrentPassword() {
        Optional<LibraryUser> optionalLibraryUserFromDb = Optional.of(createVisitorLibraryUser());
        LibraryUser libraryUserFromUi = createUserWithBlankPassword();
        UUID userId = UUID.randomUUID();
        when(userRepository.findById(userId)).thenReturn(optionalLibraryUserFromDb);
        when(userRepository.save(libraryUserFromUi)).thenReturn(libraryUserFromUi);
        LibraryUser updatedUser = userService.updateUser(userId, libraryUserFromUi);
        assertEquals("The password of updated user was changed", USER_PASSWORD, updatedUser.getPassword());
    }

    @Test(expected = EntityNotFoundException.class)
    public void testNotFoundExceptionDuringUpdate() {
        UUID userId = UUID.randomUUID();
        LibraryUser libraryUserFromUi = createUserWithBlankPassword();
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        userService.updateUser(userId, libraryUserFromUi);
    }

    @Test
    public void testChangePermission() {
        UUID userId = UUID.randomUUID();
        Optional<LibraryUser> optionalVisitorUser = Optional.of(createVisitorLibraryUser());
        when(userRepository.findById(userId)).thenReturn(optionalVisitorUser);
        when(permissionService.findPermissionByName(ADMIN)).thenReturn(createAdminPermission());
        LibraryUser userWithNewPermission = userService.changeUserPermission(userId, ADMIN);
        assertEquals("The new permission is wrong", ADMIN, userWithNewPermission.getPermission().getName());
    }

    @Test(expected = EntityNotFoundException.class)
    public void testNotFoundExceptionDuringPermissionUpdate() {
        UUID userResourceId = UUID.randomUUID();
        when(userRepository.findById(userResourceId)).thenReturn(Optional.empty());
        when(permissionService.findPermissionByName(anyString())).thenReturn(new Permission());
        userService.changeUserPermission(userResourceId, anyString());
    }

    private LibraryUser createVisitorLibraryUser() {
        LibraryUser libraryUser = new LibraryUser();
        libraryUser.setName(USER_NAME);
        libraryUser.setPassword(USER_PASSWORD);
        return libraryUser;
    }

    private LibraryUser createUserWithBlankPassword() {
        LibraryUser libraryUser = createVisitorLibraryUser();
        libraryUser.setPassword(EMPTY);
        return libraryUser;
    }

    private Permission createVisitorPermission() {
        Permission permission = new Permission();
        permission.setName(VISITOR);
        return permission;
    }

    private Permission createAdminPermission() {
        Permission permission = new Permission();
        permission.setName(ADMIN);
        return permission;
    }
}
