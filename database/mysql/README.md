# Eagle Leap MySQL

Primary database connection for this project:

- Database: `eagleleap`
- Host: `localhost`
- Port: `3306`
- Username: `root`
- Password: `root`

Suggested local setup flow:

```sql
SOURCE database/mysql/schema.sql;
SOURCE database/mysql/seed.sql;
```

Notes:

- `schema.sql` is idempotent and uses `CREATE DATABASE IF NOT EXISTS` / `CREATE TABLE IF NOT EXISTS`.
- `seed.sql` inserts baseline roles, permissions, CMS pages, sample content, and default users.
- The backend Node service reads matching defaults from `apps/api-node/.env.example`.
- The Spring Boot reference backend reads matching defaults from `apps/api-spring/src/main/resources/application.yml`.

Seeded login accounts:

- `admin@eagleleap.in` / `admin123`
- `author@eagleleap.in` / `author123`
- `buyer@eagleleap.in` / `buyer123`
- `distributor@eagleleap.in` / `distributor123`
