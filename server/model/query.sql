-- View all rows --
SELECT * FROM public.items
ORDER BY id ASC

-- Insert New Item --
INSERT INTO items (name) 
VALUES ('Wake up early');

-- delete old item --
DELETE FROM items where id = $1;
