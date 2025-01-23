const USER_QUERIES = {
  GET_USERS_BY_USERNAME_OR_EMAIL: `SELECT username, email FROM users WHERE username = $1 OR email = $2`,
  GET_EXISTING_USERNAME_OR_EMAIL: `SELECT username, email FROM users WHERE (username = $1 OR email = $2) AND user_id != $3`,
  GET_USER_BY_USERNAME_OR_EMAIL: `SELECT user_id, username, email, password FROM users WHERE username = $1 OR email = $2`,
  GET_USER_EMAIL: `SELECT email FROM users WHERE email = $1;`,
  CREATE_NEW_USER: `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
  UPDATE_USER_DATA:
    "UPDATE users SET email = $2, username = $3 WHERE user_id = $1",
  DELETE_REFRESH_TOKEN: `DELETE FROM refresh_tokens WHERE token = $1`,
  DELETE_ALL_REFRESH_TOKENS: `DELETE FROM refresh_tokens WHERE user_id = $1`,
  DELETE_USER_ACCOUNT: "DELETE FROM users WHERE user_id = $1",
};

const TOKEN_QUERIES = {
  CREATE_NEW_REFRESH_TOKEN: `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)`,
  GET_USER_BY_REFRESH_TOKEN: `SELECT user_id FROM refresh_tokens WHERE token = $1`,
};

const PASSWORD_RESET_QUERIES = {
  SET_PASSWORD_RESET_OTP:
    "UPDATE users SET otp = $2, otp_expiry = $3 WHERE email = $1;",
  GET_PASSWORD_RESET_OTP: "SELECT otp, otp_expiry FROM users WHERE email = $1;",
  RESET_PASSWORD_AND_CLEAR_OTP:
    "UPDATE users SET password = $1, otp = NULL, otp_expiry = NULL WHERE email = $2;",
};

export { USER_QUERIES, TOKEN_QUERIES, PASSWORD_RESET_QUERIES };
