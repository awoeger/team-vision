// user_role in object is the second column in user_roles table
const userResponses = [
  { response: 'yes' },
  { response: 'maybe' },
  { response: 'no' },
];
// user_roles is the table
//  userRoles the array of objects
// 'user_role' is the key of the object
exports.up = async function up(sql) {
  await sql`
	INSERT INTO event_user ${sql(userResponses, 'response')}
	`;
};

// user_roles is the table
// user_role is the key of the object
// user.Role ist the array of objects
exports.down = async function down(sql) {
  for (const userResponse of userResponses) {
    await sql`
      DELETE FROM
        event_user
      WHERE
			response = ${userResponse.response}
    `;
  }
};
