const checkObjByList = (obj, list) => {
  let isNotFound = false;
  list.forEach(el => {
    if (!obj[el]) {
      isNotFound = true;
    }
  });
  return !isNotFound;
};

module.exports = checkObjByList;
