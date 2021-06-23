const exerciseTypes = [
  { title: 'arms' },
  { title: 'abs' },
  { title: 'legs' },
  { title: 'back' },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO exercise_types ${sql(exerciseTypes, 'title')}
	`;
};

exports.down = async function down(sql) {
  for (const exerciseType of exerciseTypes) {
    await sql`
      DELETE FROM
        exercise_types
      WHERE
        title = ${exerciseType.title}
    `;
  }
};
