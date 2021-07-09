// export const firstEventResponse = (playerId, allPlayersArray) => {
//   // create a copy of the allPlayers, allResponses array
//   const newAllPlayerArray = [...allPlayersArray];

//   // find the person.id that has been clicked on
//   const attendingPlayer = newAllPlayerArray.find((p) => p.id === playerId);

//   const attendingMemberIndex = newAllPlayerArray.indexOf(attendingPlayer);

//   // Change the status number to accepted
//   if (attendingPlayer) {
//     newAllPlayerArray.splice(attendingMemberIndex, 1);
//   }

//   return newAllPlayerArray;
// };

export const pushFirstEventResponse = (
  loggedinUser,
  allResponsesArray,
  response,
) => {
  const userWithResponse = [...loggedinUser];

  const newAllResponsesArray = [...allResponsesArray];

  if (!newAllResponsesArray.includes(userWithResponse[0])) {
    userWithResponse[0].response = response;
    // TODO 1: if loggedInuser doesn't exist in NewAllResponsesArray then ...
    newAllResponsesArray.push(userWithResponse[0]);
  } else {
    userWithResponse[0].response = response;
    // TODO 2: if it does exist
    // - 1: find the index of the loggedInuser in the newAllresponsesArray
    // - 2: newAllResponsesArray[index that we find in 1].response = respon
    const userWithResponseIndex = newAllResponsesArray.indexOf(
      userWithResponse[0],
    );

    console.log('uswr', userWithResponseIndex);

    newAllResponsesArray[userWithResponseIndex].response = response;
  }

  // TODO 3: return....
  return newAllResponsesArray;
};
