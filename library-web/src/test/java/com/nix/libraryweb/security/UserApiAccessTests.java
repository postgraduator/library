package com.nix.libraryweb.security;

import static com.nix.libraryweb.security.constants.LibraryRole.ADMIN;
import static com.nix.libraryweb.security.constants.LibraryRole.VISITOR;
import static org.apache.commons.lang3.StringUtils.EMPTY;
import static org.junit.Assert.assertNotEquals;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.nix.libraryweb.model.service.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserApiAccessTests {
    private final static String USER_ID = "23fecd6a-327f-4487-aade-563a67812f6c";
    private final static String ANOTHER_USER_ID = "8c405a79-41b0-43b2-b875-c5ec573ad038";

    @Value("#{'${spring.data.rest.base-path}' + '/users'}")
    private String apiPath;

    @Autowired
    private MockMvc mvc;

    @Test
    @WithMockUser(roles = ADMIN)
    public void testAdminUserListRetrieving() throws Exception {
        mvc.perform(get(apiPath))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = VISITOR)
    public void testVisitorUserListRetrieving() throws Exception {
        mvc.perform(get(apiPath))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithAnonymousUser
    public void testSelfRgistration() throws Exception {
        int responseStatus = mvc.perform(post(apiPath).with(csrf()))
                .andReturn()
                .getResponse()
                .getStatus();
        assertNotEquals("The access for user creation link must be public", HttpStatus.FORBIDDEN.value(), responseStatus);
    }

    @Test
    @WithMockUser(value = USER_ID, roles = EMPTY)
    public void testPersonalInfoUpdate() throws Exception {
        int responseStatus = mvc.perform(put(apiPath + "/" + USER_ID).with(csrf()))
                .andReturn()
                .getResponse()
                .getStatus();
        assertNotEquals("A user has to have possibility to update his personal data", HttpStatus.FORBIDDEN.value(), responseStatus);
    }

    @Test
    @WithMockUser(roles = ADMIN)
    public void testAdminNoPossibilityToChangePersonalUserData() throws Exception {
        mvc.perform(put(apiPath + "/" + USER_ID).with(csrf()))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(value = USER_ID, roles = EMPTY)
    public void testNoAdminUserAccessToPersonalResource() throws Exception {
        int responseStatus = mvc.perform(get(apiPath + "/" + USER_ID))
                .andReturn()
                .getResponse()
                .getStatus();
        assertNotEquals("A user has to have an access to his own resource", HttpStatus.FORBIDDEN.value(), responseStatus);
    }

    @Test
    @WithMockUser(value = USER_ID, roles = VISITOR)
    public void testNoAdminUserAccessToNonPersonalResource() throws Exception {
        mvc.perform(get(apiPath + "/" + ANOTHER_USER_ID))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(value = USER_ID)
    public void testAccessToCurrentUser() throws Exception {
        int responseStatus = mvc.perform(get(apiPath + "/search/current"))
                .andReturn()
                .getResponse()
                .getStatus();
        assertNotEquals("A user must have access to his info", HttpStatus.FORBIDDEN.value(), responseStatus);
    }


}
