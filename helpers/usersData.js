// const userMainField = [
const userMainField = [
  '_id',
  'userName',
  'email',
  // 'password',
  'location',
  'phone',
  'birthday',
  'avatar',
  'favorites',
  'groupAcces',
  // 'authToken',
];

const userFullField = [
  '_id',
  'userName',
  'email',
  // 'password',
  'location',
  'phone',
  'birthday',
  'avatar',
  'favorites',
  'groupAcces',
  'authToken',
];
// isActivates, // groupsResurces, authToken,

const userFieldRecivedFromFront = [
  'userName',
  'email',
  'location',
  'phone',
  'birthday',
  'avatar',
];

const requiredSignUpFields = [
  'userName',
  'email',
  'location',
  'phone',
  'password',
];
module.exports = {
  userMainField,
  userFullField,
  userFieldRecivedFromFront,
  requiredSignUpFields,
};
