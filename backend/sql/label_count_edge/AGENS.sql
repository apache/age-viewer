SELECT SPLIT_PART(start::text, '.', 1) AS la_start, SPLIT_PART("end"::text, '.', 1) AS la_end, COUNT(1) AS la_count
FROM %s
GROUP BY SPLIT_PART(start::text, '.', 1), SPLIT_PART("end"::text, '.', 1)
