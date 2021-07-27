exports.up = async function up(sql) {
  await sql`
		ALTER TABLE events
drop CONSTRAINT events_team_id_fkey;
	`;
};

exports.down = async function down(sql) {};
