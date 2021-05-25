SELECT label, count(label)::INTEGER as cnt
FROM (
         SELECT ag_catalog._label_name(oid, v)::text as label
         from cypher('%s', $$
             MATCH ()-[V]-()
             RETURN id(V)
             $$) as (V agtype), (SELECT oid FROM ag_catalog.ag_graph where name = '%s') as oid
     ) b
GROUP BY b.label;

-- TODO: COUNT needs AGE supporting or Client-side processing.
