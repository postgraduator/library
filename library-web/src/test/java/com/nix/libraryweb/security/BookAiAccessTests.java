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
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class BookAiAccessTests {
    private final static String BOOK_ID = "8c405a79-41b0-43b2-b875-c5ec573ad038";

    @Value("#{'${spring.data.rest.base-path}' + '/books'}")
    private String apiPath;

    @Autowired
    private MockMvc mvc;

    @Test
    @WithAnonymousUser
    public void testAuthenticatedAccess() throws Exception {
        mvc.perform(get(apiPath))
                .andExpect(status().isForbidden());

    }

    @Test
    @WithMockUser(roles = ADMIN)
    public void testAdminAccessForPost() throws Exception {
        int responseStatus = mvc.perform(post(apiPath).with(csrf()))
                .andReturn()
                .getResponse()
                .getStatus();
        assertNotEquals("The admin must have access to add a new book item", HttpStatus.FORBIDDEN.value(), responseStatus);

    }

    @Test
    @WithMockUser(roles = ADMIN)
    public void testAdminAccessForPut() throws Exception {
        int responseStatus = mvc.perform(put(apiPath).with(csrf()))
                .andReturn()
                .getResponse()
                .getStatus();
        assertNotEquals("The admin must have access to add change a book item", HttpStatus.FORBIDDEN.value(), responseStatus);

    }

    @Test
    @WithMockUser(roles = VISITOR)
    public void testVisitorAccessForPost() throws Exception {
        mvc.perform(post(apiPath).with(csrf()))
                .andExpect(status().isForbidden());

    }

    @Test
    @WithMockUser(roles = VISITOR)
    public void testVisitorAccessForPut() throws Exception {
        mvc.perform(put(apiPath + "/" + BOOK_ID).with(csrf()))
                .andExpect(status().isForbidden());

    }
}
