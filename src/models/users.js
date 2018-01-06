export const usersModel = (users) => console.log('test',users) ||users.map(user => userModel(user));

export const userModel = (user) => ({
    "id": user.id ? +user.id : -1,
    "name": user.name,
    "username": user.username,
    "email": user.email,
    "phone": user.phone,
    "website": user.website,

    /* extra return values
      company
      address
    */
});
