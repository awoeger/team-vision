const testUsers = [
  {
    user_role_id: 1,
    user_first_name: 'Test',
    user_last_name: 'Coach',
    username: 'test_coach',
    user_email: 'test@coach',
    user_password_hash: 'testpassword!234567',
  },
  {
    user_role_id: 2,
    user_first_name: 'Test',
    user_last_name: 'Player',
    username: 'test_player',
    user_email: 'test@player',
    user_password_hash: 'testpassword765432!',
  },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO users ${sql(
    testUsers,
    'user_role_id',
    'user_first_name',
    'user_last_name',
    'username',
    'user_email',
    'user_password_hash',
  )}
	`;
};

exports.down = async function down(sql) {
  for (const testUser of testUsers) {
    await sql`
      DELETE FROM
        users
      WHERE
        username = ${testUser.username}
    `;
  }
};
