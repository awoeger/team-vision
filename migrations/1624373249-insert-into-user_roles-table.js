// user_role in object is the second column in user_roles table
const userRoles = [
  { user_role: 'coach', id: 1 },
  { user_role: 'player', id: 2 },
];

// user_roles is the table
//  userRoles the array of objects
// 'user_role' is the key of the object
exports.up = async function up(sql) {
  await sql`
	INSERT INTO user_roles ${sql(userRoles, 'id', 'user_role')}
	`;
};

// user_roles is the table
// user_role is the key of the object
// user.Role ist the array of objects
exports.down = async function down(sql) {
  for (const userRole of userRoles) {
    await sql`
      DELETE FROM
        user_roles
      WHERE
        user_role = ${userRole.role}
    `;
  }
};
