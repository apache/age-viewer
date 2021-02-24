SELECT l.labid as la_oid, l.labname as la_name, l.labkind as la_kind
FROM PG_CATALOG.AG_LABEL l
         INNER JOIN PG_CATALOG.AG_GRAPH g ON g.oid = l.graphid
WHERE g.graphname = $1
  and l.labname not in ('ag_vertex', 'ag_edge')
