export const firstEventResponse = (playerId, allPlayersArray) => {
  // create a copy of the allPlayers, allResponses array
  const newAllPlayerArray = [...allPlayersArray];

  // find the person.id that has been clicked on
  const attendingPlayer = newAllPlayerArray.find((p) => p.id === playerId);

  const attendingMemberIndex = newAllPlayerArray.indexOf(attendingPlayer);

  // Change the status number to accepted
  if (attendingPlayer) {
    newAllPlayerArray.splice(attendingMemberIndex, 1);
  }

  return newAllPlayerArray;
};

export const pushFirstEventResponse = (
  playerId,
  allResponsesArray,
  allPlayersArray,
) => {
  console.log('allResponsesArray', allResponsesArray);

  // create a copy of the allPlayers, allResponses array
  const newAllResponsesArray = [...allResponsesArray];
  console.log('newAllResponsesArray', newAllResponsesArray);

  // find the person.id that has been clicked on
  // const player = newAllResponsesArray.find((p) => p.usersId === playerId);
  // console.log('player', player);

  const player = allPlayersArray.find((p) => p.id === playerId);

  // Change the status number to accepted
  if (player) {
    newAllResponsesArray.push(player);
  }

  return newAllResponsesArray;
};
