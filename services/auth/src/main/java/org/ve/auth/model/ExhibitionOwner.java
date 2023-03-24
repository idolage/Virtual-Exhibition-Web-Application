package org.ve.auth.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import java.util.Collection;
import java.util.Collections;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class ExhibitionOwner implements UserDetails {
    @Id
    private Long id;
    private String emailAddress;
    private String name;
    private String contactNo;
    private String nic;
    private String password;
    private String company;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private boolean locked = false;
    private boolean enabled = true;

    public ExhibitionOwner(String emailAddress, String name, String contactNo, String nic, String password, String company, UserRole userRole) {
        this.emailAddress = emailAddress;
        this.name = name;
        this.contactNo = contactNo;
        this.nic = nic;
        this.password = password;
        this.company = company;
        this.userRole = userRole;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return emailAddress;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
