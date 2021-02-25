SELECT usename as user_name,
       CASE
           WHEN usesuper THEN
               CAST('admin' AS pg_catalog.text)
           ELSE
               CAST('user' AS pg_catalog.text)
           END    role_name
FROM pg_catalog.pg_user
WHERE usename = $1
