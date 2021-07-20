import { insertUser } from '../database';

test('insertUser creates correct DB entry', async () => {
  const testUserFirstName = 'Andrea';
  const testUserLastName = 'Woeger';
  const testUserEmail = 'aw@aw';
  const testUsername = 'andrea';
  const testUserPasswordHash = '1234abcd';
  const testUserRoleId = 1;

  const newUser = await insertUser(
    testUserFirstName,
    testUserLastName,
    testUserEmail,
    testUsername,
    testUserPasswordHash,
    testUserRoleId,
  );
  expect(newUser.userFirstName).toBe(testUserFirstName);
  expect(newUser.userLastName).toBe(testUserLastName);
  expect(newUser.userEmail).toBe(testUserEmail);
  expect(newUser.username).toBe(testUsername);
  expect(newUser.userPasswordHash).toBe(testUserPasswordHash);
  expect(newUser.userRoleId).toBe(testUserRoleId);
});
