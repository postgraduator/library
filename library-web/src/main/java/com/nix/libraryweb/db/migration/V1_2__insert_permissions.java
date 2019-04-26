package com.nix.libraryweb.db.migration;

import static com.nix.libraryweb.security.constants.LibraryRole.ADMIN;
import static com.nix.libraryweb.security.constants.LibraryRole.VISITOR;

import java.sql.Statement;

import org.flywaydb.core.api.migration.BaseJavaMigration;
import org.flywaydb.core.api.migration.Context;

public class V1_2__insert_permissions extends BaseJavaMigration {
    @Override
    public void migrate(Context context) throws Exception {
        try (Statement insert = context.getConnection().createStatement()){
            insert.executeUpdate(buildInsertQuery(ADMIN));
            insert.executeUpdate(buildInsertQuery(VISITOR));
        }
    }

    private String buildInsertQuery(String permissionName) {
        return "insert into permission (name) values('" + permissionName + "')";
    }
}
