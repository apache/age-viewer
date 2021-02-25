SELECT name as label, 0 as cnt
FROM ag_catalog.ag_label
WHERE graph = (SELECT oid FROM ag_catalog.ag_graph where name = '%s')
  AND kind = 'e';

-- TODO: COUNT needs AGE supporting or Client-side processing.
