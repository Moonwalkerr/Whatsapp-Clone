// this utility function returns the recipent's email : the one which isnt logged in and is the receiver
const getRecipentEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];
export default getRecipentEmail;
