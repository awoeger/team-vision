exports.up = async function up(sql) {
  await sql`
		CREATE TABLE status_types (
			id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			status_type varchar(20)	NOT NULL
		)
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE status_types
	`;
};
