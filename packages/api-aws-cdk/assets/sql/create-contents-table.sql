CREATE TABLE IF NOT EXISTS contents (
  id serial PRIMARY KEY,
  category_id INTEGER NULL,
  label VARCHAR(255) NULL,
  markdown TEXT NULL
);
