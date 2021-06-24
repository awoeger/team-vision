exports.up = async function up(sql) {
  await sql`
		CREATE TABLE user_roles (
			id integer PRIMARY KEY NOT NULL,
			user_role_id varchar(10)
		)
	`;
};

exports.down = async function down(sql) {
  await sql`
		DROP TABLE user_roles
	`;
};
