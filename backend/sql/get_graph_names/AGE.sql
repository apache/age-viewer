SELECT s.schema_name
FROM information_schema.schemata s
JOIN information_schema.tables t
ON s.schema_name = t.table_schema
WHERE table_name = '_ag_label_edge';
