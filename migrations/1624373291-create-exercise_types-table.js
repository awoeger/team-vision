exports.up = async function up(sql) {
  await sql`
		CREATE TABLE exercise_types (
			id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			title varchar(20)
		)
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE exercise_types
	`;
};