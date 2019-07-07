package com.nix.libraryweb.model.entity;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
import static javax.persistence.CascadeType.DETACH;
import static javax.persistence.CascadeType.REFRESH;
import static javax.persistence.TemporalType.DATE;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class LibraryUser {
    public enum Gender {
        MALE, FEMALE
    }

    @Id
    @GeneratedValue
    private UUID id;
    @Size(min = 3, max = 30)
    @Pattern(regexp = "\\w+")
    private String name;
    @Email
    @NotBlank
    private String email;
    @JsonProperty(access = WRITE_ONLY)
    private String password;
    @Temporal(DATE)
    @JsonFormat(timezone = "UTC")
    private Date birthday;
    private Gender gender;
    @ManyToOne(cascade = {REFRESH, DETACH})
    @NotNull
    private Permission permission;
    @OneToMany
    @JoinColumn(name = "library_user_id")
    private Set<OrderInfo> orderInfoSet;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Set<OrderInfo> getOrderInfoSet() {
        return orderInfoSet;
    }

    public void setOrderInfoSet(Set<OrderInfo> orderInfoSet) {
        this.orderInfoSet = orderInfoSet;
    }

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }
}
