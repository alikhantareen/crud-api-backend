const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "root",
      password: "",
      database: "library",
    },
    listPerPage: 100,
  };
  module.exports = config;