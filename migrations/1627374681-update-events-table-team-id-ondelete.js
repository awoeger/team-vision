exports.up = async function up(sql) {
  await sql`

ALTER TABLE events
ADD CONSTRAINT events_team_id_fkey
    FOREIGN KEY (team_id)
    REFERENCES teams
        (id)
    ON DELETE CASCADE ON UPDATE NO ACTION;
	`;
};

exports.down = async function down(sql) {};
