package org.ve.auth.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class Admin implements UserDetails{
    @SequenceGenerator(
            name = "admin_sequence",
            sequenceName = "admin_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "admin_sequence"
    )
    private Long id;
    private String emailAddress;
    private String name;
    private String contactNo;
    private String nic;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    private boolean locked = false;
    private boolean enabled = false;

    public Admin(String emailAddress, String name, String contactNo, String nic, String password, UserRole userRole) {
        this.emailAddress = emailAddress;
        this.name = name;
        this.contactNo = contactNo;
        this.nic = nic;
        this.password = password;
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
