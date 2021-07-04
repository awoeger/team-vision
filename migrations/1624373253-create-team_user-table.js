exports.up = async function up(sql) {
  await sql`
		CREATE TABLE team_user (
			users_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL ,
			team_id INT REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
			status_id INT REFERENCES status_types(id) ON DELETE CASCADE NOT NULL,
			position_on_team varchar(50),
			playing_since varchar(7),
			experience_level varchar(15),
			player_message varchar(100)
		)
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE team_user
	`;
};
