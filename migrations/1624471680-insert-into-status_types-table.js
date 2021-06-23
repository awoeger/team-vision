const statusTypes = [
  { title: 'accepted' },
  { title: 'declined' },
  { title: 'awaiting' },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO status_types ${sql(statusTypes, 'title')}
	`;
};

exports.down = async function down(sql) {
  for (const statusType of statusTypes) {
    await sql`
      DELETE FROM
        status_types
      WHERE
        title = ${statusType.title}
    `;
  }
};
