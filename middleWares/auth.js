const auth = async (req, res, next) => {
  req.user = { _id: '63fa259fd13dbfbacfe99325' }; // to be rewrited after auth module creation
  next();
};

module.exports = auth;
