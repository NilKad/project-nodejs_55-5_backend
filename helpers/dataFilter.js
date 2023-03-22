const dataFilter = (obj, arr) => {
  const newObj = {};
  arr.forEach(item => {
    if (obj[item]) {
      newObj[item] = obj[item];
    }
  });
  return newObj;
};

module.exports = { dataFilter };
