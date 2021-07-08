const exercises = [
  { bodyPart: 'Abs' },
  { exerciseName: 'Alternate Heel Touchers' },
  { equipment: 'Body only' },
  { videoURL: 'https://www.youtube.com/watch?v=1Of0VqpvVKs' },
];

exports.up = async function up(sql) {
  await sql`
	INSERT INTO exercises ${sql(
    exercises,
    'bodyPart',
    'exerciseName',
    'equipment',
    'videoURL',
  )}
	 `;
};

exports.down = async function down(sql) {
  for (const exercise of exercises) {
    await sql`
      DELETE FROM
        exercises
      WHERE
        bodyPart = ${exercise.bodyPart}
    `;
  }
};
