exports.up = async function up(sql) {
  await sql`
		CREATE TABLE team_user (
			users_id INT REFERENCES users(id) NOT NULL,
			team_id INT REFERENCES teams(id) NOT NULL,
			status_id INT REFERENCES status_types(id) NOT NULL,
			position_on_team varchar(50),
			playing_since varchar(7),
			experience_level varchar(10),
			player_message varchar(100)
		)
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE team_user
	`;
};
