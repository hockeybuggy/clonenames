/* Import faunaDB sdk */
const faunadb = require("faunadb");

function getGameCode(urlPath) {
  return urlPath.match(/([^\/]*)\/*$/)[0];
}

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const gameCode = getGameCode(event.path);
  console.log("Function `game-load` invoked. Game code:", gameCode);
  return client
    .query(q.Get(q.Match(q.Index("games_by_code"), gameCode)))
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
