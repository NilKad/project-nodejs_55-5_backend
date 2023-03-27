const constructorResponse = async ({
  pagination,
  news,
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
      news: news,
    };
  }
  return { news };
};

module.exports = constructorResponse;
