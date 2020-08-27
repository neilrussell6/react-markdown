INSERT INTO migrations (id, data)
VALUES (1, $1)
ON CONFLICT (id) DO UPDATE SET data = $1;
