MATCH (v) RETURN DISTINCT label(v) AS label, count(v) AS cnt
ORDER BY label
-- %s %s
