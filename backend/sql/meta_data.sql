ANALYZE;
SELECT c.relname AS label, c.reltuples AS cnt
FROM pg_catalog.pg_class c
JOIN pg_catalog.pg_namespace n
ON n.oid = c.relnamespace
WHERE c.relkind = 'r'
AND n.nspname = '%s';