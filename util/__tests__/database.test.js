import {
  connectOneTimeToDatabase,
  createNewEvent,
  createNewTeam,
  createPlayerRequest,
  deleteEvent,
  deleteTeam,
  updatePlayerRequest,
} from '../database';

beforeAll(() => {
  connectOneTimeToDatabase();
});

test('createNewTeam creates correct DB entry', async () => {
  // Create new Team
  const testTeamName = 'Test Team';
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

  // Create new Event
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

  expect(newEvent[0].eventType).toBe(testEventType);
  expect(newEvent[0].teamId).toBe(testTeamId);
  expect(newEvent[0].startTime).toBe(testStartTime);
  expect(newEvent[0].endTime).toBe(testEndTime);
  expect(newEvent[0].meetingTime).toBe(testMeetingTime);
  expect(newEvent[0].eventLocation).toBe(testEventLocation);
  expect(newEvent[0].eventDescription).toBe(testEventDescription);

  // TODO: CreatePlayerRequest
  const testTeamChoice = 'Test Team';
  const testPositionOnTeam = 'Test Position';
  const testPlayingSince = '10/1991';
  const testExperienceLevel = 'Beginner';
  const testMessage = 'Test Message';

  const newPlayerRequest = await createPlayerRequest(
    testusersId,
    testTeamChoice,
    testPositionOnTeam,
    testPlayingSince,
    testExperienceLevel,
    testMessage,
  );

  expect(newPlayerRequest.positionOnTeam).toBe(testPositionOnTeam);
  expect(newPlayerRequest.playingSince).toBe(testPlayingSince);
  expect(newPlayerRequest.experienceLevel).toBe(testExperienceLevel);
  expect(newPlayerRequest.playerMessage).toBe(testMessage);

  // TODO: update Player Request
  const testPlayerRequestId = newPlayerRequest[0].id;
  const updatedPlayerRequest = await updatePlayerRequest(testPlayerRequestId);
  expect(updatedPlayerRequest[0].statusId).toBe(testPlayerRequestId);

  // TODO: delete Player Request
  const deletedPlayerRequest = await deleteEvent(testPlayerRequestId);
  expect(deletedPlayerRequest[0].id).toBe(testPlayerRequestId);

  // delete Event
  const testEventId = newEvent[0].id;
  const deletedEvent = await deleteEvent(testEventId);
  expect(deletedEvent[0].id).toBe(testEventId);

  // delete Team
  const deletedTeam = await deleteTeam(testTeamId);
  expect(deletedTeam[0].id).toBe(testTeamId);
});

afterAll(() => {
  const sql = connectOneTimeToDatabase();
  sql.end({ timeout: 0 });
});