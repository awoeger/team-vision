export const pushFirstEventResponse = (
  loggedinUser,
  allResponsesArray,
  response,
) => {
  // Make copy of the loggedin user object, which has the first name, last name and id
  const userWithResponse = [...loggedinUser];

  // Make copy of the allResponses Array - to return the changed copy in the end
  const newAllResponsesArray = [...allResponsesArray];

  if (!newAllResponsesArray.includes(userWithResponse[0])) {
    // Add the property of response with the value of "response" into our userWithResponseObject
    userWithResponse[0].response = response;

    // If the userWithResponse doesn't exist in the newAllResponsesArray
    // push the userWithResponse into the newAllResponsesArray
    newAllResponsesArray.push(userWithResponse[0]);
  } else {
    // if it does exist
    // Add the property of response with the value of the new "response" into our userWithResponseObject
    userWithResponse[0].response = response;

    // find the index of the userWithResponse in the newAllResponsesArray
    const userWithResponseIndex = newAllResponsesArray.indexOf(
      userWithResponse[0],
    );

    //  Set the response property to the new response
    newAllResponsesArray[userWithResponseIndex].response = response;
  }
  return newAllResponsesArray;
};

export const getTotalAttendeesForEvent = (arr) => {
  return arr.reduce((acc, attendee) => acc + attendee, 0);
};

export const deleteTeam = (id, coachTeamArray) => {
  // create a copy of the allTeam array
  const newTeamArray = [...coachTeamArray];
  // find the team.id that has been clicked on
  const deletedTeam = newTeamArray.find((e) => e.id === id);
  // get the index of the team in the copy of the array
  const deletedTeamIndex = newTeamArray.indexOf(deletedTeam);
  // splice the index out of the array
  if (deletedTeam) {
    newTeamArray.splice(deletedTeamIndex, 1);
  }

  return newTeamArray;
};
