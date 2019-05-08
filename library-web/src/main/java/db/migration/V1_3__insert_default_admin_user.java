package db.migration;

import static com.nix.libraryweb.security.constants.LibraryRole.ADMIN;
import static com.nix.libraryweb.utils.SecurityUtils.createPasswordEncoder;

import java.sql.PreparedStatement;
import java.util.Map;
import java.util.UUID;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.yaml.snakeyaml.Yaml;

public class V1_3__insert_default_admin_user extends BaseJavaMigration {

    @Override
    public void migrate(Context context) throws Exception {
        String sql = "insert into library_user (id, name, password, email, permission_id) " +
                "values(?, ?, ?, ?, (select id from permission where name = ?))";
        Map<String, String> prop = getDefaultAdminPropertiesMap();
        try (PreparedStatement insert = context.getConnection().prepareStatement(sql)){
            String name = prop.get("name");
            String password = encodePassword(prop.get("password"));
            String email = prop.get("email");
            insert.setObject(1, UUID.randomUUID());
            insert.setString(2, name);
            insert.setString(3, password);
            insert.setString(4, email);
            insert.setString(5, ADMIN);
            insert.executeUpdate();
        }
    }

    private Map<String, String> getDefaultAdminPropertiesMap() {
        Yaml yaml = new Yaml();
        return (Map<String, String>) yaml.loadAs(V1_3__insert_default_admin_user
                .class.getClassLoader()
                .getResourceAsStream("application.yaml"), Map.class).get("user");
    }

    private String encodePassword(String rawPassword) {
        PasswordEncoder passwordEncoder = createPasswordEncoder();
        return passwordEncoder.encode(rawPassword);
    }
}
