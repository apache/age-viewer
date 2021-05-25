MATCH (v)-[e]-(v2) RETURN DISTINCT label(e) AS label, count(e) AS cnt
ORDER BY label

-- %s %s
