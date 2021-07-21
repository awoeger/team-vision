import {
  connectOneTimeToDatabase,
  createNewEvent,
  createNewTeam,
  createPlayerRequest,
  insertUser,
} from '../database';

beforeAll(() => {
  connectOneTimeToDatabase();
});

test('createNewTeam creates correct DB entry', async () => {
  const testTeamName = 'Test Team Name';
  const testSportType = 'Test Sport Type';
  const testFoundedAt = '10/1999';
  const testusersId = 13;

  const newTeam = await createNewTeam(
    testTeamName,
    testSportType,
    testFoundedAt,
    testusersId,
  );
  expect(newTeam.teamName).toBe(testTeamName);
  expect(newTeam.sportType).toBe(testSportType);
  expect(newTeam.founded).toBe(testFoundedAt);
  expect(newTeam.coachUserId).toBe(testusersId);

  const testEventType = 'Training';
  const testTeamId = newTeam.id;
  const testStartDate = ' 19.12.2022';
  const testEndDate = '19.12.2022';
  const testMeetingTime = '18:00';
  const testStartTime = '19:00';
  const testEndTime = '20:00';
  const testEventLocation = 'Test Location';
  const testEventDescription = 'Test Test Test';

  const newEvent = await createNewEvent(
    testEventType,
    testTeamId,
    testStartDate,
    testEndDate,
    testMeetingTime,
    testStartTime,
    testEndTime,
    testEventLocation,
    testEventDescription,
  );
});

//   const newUser = await insertUser(user);
//   expect(newUser.userFirstName).toBe(testUserFirstName);
//   expect(newUser.userLastName).toBe(testUserLastName);
//   expect(newUser.userEmail).toBe(testUserEmail);
//   expect(newUser.username).toBe(testUsername);
//   expect(newUser.userRoleId).toBe(testUserRoleId);
// });

// test('createPlayerRequest creates correct DB entry', async () => {
//   const testTeamChoice = 'Test Team';
//   const testPositionOnTeam = 'Test Position';
//   const testPlayingSince = 'xx.yyy';
//   const testExperienceLevel = 'Beginner';
//   const testMessage = 'Test Test Test';
//   const testUsersId = 3;

//   const newUser = await insertUser(
//     testTeamChoice,
//     testPositionOnTeam,
//     testPlayingSince,
//     testExperienceLevel,
//     testMessage,
//     testUsersId,
//   );
//   expect(newUser.userFirstName).toBe(testTeamChoice);
//   expect(newUser.userLastName).toBe(testPositionOnTeam);
//   expect(newUser.userEmail).toBe(testPlayingSince);
//   expect(newUser.username).toBe(testExperienceLevel);
//   expect(newUser.userRoleId).toBe(testUserRoleId);
// });

afterAll(() => {
  const sql = connectOneTimeToDatabase();
  sql.end({ timeout: 0 });
});
