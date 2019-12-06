package db.migration;

import static com.nix.libraryweb.security.constants.LibraryRole.ADMIN;
import static com.nix.libraryweb.utils.SecurityUtils.createPasswordEncoder;

import java.sql.PreparedStatement;
import java.util.UUID;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.security.crypto.password.PasswordEncoder;

public class V1_3__insert_default_admin_user extends BaseJavaMigration {

    private final static String NAME = "ladmin";
    private final static String PASSWORD = "lPassword";
    private final static String EMAIL = "ladmin@service.com";

    @Override
    public void migrate(Context context) throws Exception {
        String sql = "insert into library_user (id, name, password, email, permission_id) " +
                "values(?, ?, ?, ?, (select id from permission where name = ?))";
        try (PreparedStatement insert = context.getConnection().prepareStatement(sql)){
            insert.setObject(1, UUID.randomUUID());
            insert.setString(2, NAME);
            insert.setString(3, encodePassword(PASSWORD));
            insert.setString(4, EMAIL);
            insert.setString(5, ADMIN);
            insert.executeUpdate();
        }
    }

    private String encodePassword(String rawPassword) {
        PasswordEncoder passwordEncoder = createPasswordEncoder();
        return passwordEncoder.encode(rawPassword);
    }
}
