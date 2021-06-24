const eventTypes = [
  { title: 'training' },
  { title: 'tournament' },
  { title: 'social' },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO event_types ${sql(eventTypes, 'title')}
	`;
};

exports.down = async function down(sql) {
  for (const eventType of eventTypes) {
    await sql`
      DELETE FROM
        event_types
      WHERE
        title = ${eventType.title}
    `;
  }
};
