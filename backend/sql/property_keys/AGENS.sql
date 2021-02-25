MATCH (v)
RETURN DISTINCT jsonb_object_keys(v) AS key, 'v' AS key_type
UNION ALL
MATCH(v1) - [e] - (v2)
RETURN DISTINCT jsonb_object_keys(e) AS key, 'e' AS key_type
