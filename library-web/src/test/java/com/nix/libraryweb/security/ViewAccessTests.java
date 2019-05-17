package com.nix.libraryweb.security;

import static com.nix.libraryweb.controllers.constants.ViewUrl.SIGNIN;
import static com.nix.libraryweb.controllers.constants.ViewUrl.SIGNUP;
import static org.apache.commons.lang3.StringUtils.endsWith;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ViewAccessTests {

    @Autowired
    private MockMvc mvc;

    @Test
    @WithAnonymousUser
    public void testRootAccess() throws Exception {
        String signinUrl = mvc.perform(get("/"))
                .andReturn()
                .getResponse()
                .getRedirectedUrl();
        assertTrue("A user must be redirected to the sign in url", endsWith(signinUrl, SIGNIN.getUrl()));
    }

    @Test
    @WithAnonymousUser
    public void testSigninAccess() throws Exception {
        mvc.perform(get(SIGNIN.getUrl()))
                .andExpect(status().isOk());
    }

    @Test
    @WithAnonymousUser
    public void testSigninAuthentification() throws Exception {
        int responseStatus = mvc.perform(post(SIGNIN.getUrl()).with(csrf()))
                .andReturn()
                .getResponse()
                .getStatus();
        assertNotEquals("A must have a possibility to sign in", HttpStatus.FORBIDDEN.value(), responseStatus);
    }

    @Test
    @WithAnonymousUser
    public void testSignupAccess() throws Exception {
        String redirectUrl = mvc.perform(post(SIGNUP.getUrl()).with(csrf()))
                .andExpect(status().is3xxRedirection())
                .andReturn()
                .getResponse()
                .getRedirectedUrl();
        assertTrue("A user must be redirected to the signin page", endsWith(redirectUrl, SIGNIN.getUrl()));

    }
}
