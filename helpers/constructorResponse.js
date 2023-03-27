const constructorResponse = ({ pagination, total, perPage, page }, data) => {
  //
  if (pagination) {
    return {
      total,
      totalPage: Math.ceil(total / perPage),
      currentPage: page,
      perPage,
      data,
    };
  }
  return data;
};

module.exports = constructorResponse;
