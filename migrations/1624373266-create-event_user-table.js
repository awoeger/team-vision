exports.up = async function up(sql) {
  await sql`
		CREATE TABLE event_user (
			users_id INT REFERENCES users(id) NOT NULL,
			event_id INT REFERENCES events(id) NOT NULL,
			response varchar(5) NOT NULL
		)
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE event_user
	`;
};
