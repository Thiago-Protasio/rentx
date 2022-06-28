import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@shared/infra/typeorm";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXXXX')
        `
    );

    await connection.close;
}

create().then(() => console.log("User admin created!"));
