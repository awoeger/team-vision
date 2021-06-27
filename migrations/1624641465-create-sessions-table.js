exports.up = async function up(sql) {
  // TODO: Insert NOT NULL after timestamp expiry
  await sql`
		CREATE TABLE sessions (
			id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			token varchar(90) NOT NULL,
			expiry timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
			users_id integer REFERENCES users(id) ON DELETE CASCADE
		)
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE sessions
	`;
};