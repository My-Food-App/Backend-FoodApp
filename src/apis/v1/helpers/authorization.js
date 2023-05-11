const config = require("../../../configs/configs");
const jwt = require("jsonwebtoken");

function account_user({code, role, ...res}) {
  // if (role === config.ADMIN) {
  //   return {
  //     role,
  //     ...res,
  //   };
  // } else
  //   return res;
  return {
        role,
        ...res,
      };
}

function create_access_token({ _id, username, role }) {
  return jwt.sign(
    { _id, username, role },
    config.TOKEN_SECRET,
    {
      expiresIn: config.EXPIRES_IN_ACCESS_TOKEN,
    }
  );
}

function create_refresh_token({ _id }) {
  return jwt.sign(
    { _id },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: config.EXPIRES_IN_REFRESH_TOKEN,
    }
  );
}
function destroy_token(token) {
  global.jwtr.destroy(token)
}

module.exports = {
  account_user,
  create_access_token,
  create_refresh_token,
  destroy_token,
};
