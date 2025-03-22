-- This script updates a user's role to admin
-- Replace 'USER_ID_HERE' with the actual user ID from auth.users table

UPDATE user_roles
SET role = 'admin'
WHERE user_id = 'USER_ID_HERE';

-- To find a user's ID, you can run:
-- SELECT id, email FROM auth.users WHERE email = 'admin@example.com';

-- After running this script, the user will have admin privileges
-- They can then log in and create other admin or support users through the admin interface 