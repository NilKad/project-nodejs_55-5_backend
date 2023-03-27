const constructorResponse = async ({
  pagination,
  data,
  total,
  perPage,
  page,
}) => {
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
  return { news };
};

module.exports = constructorResponse;
