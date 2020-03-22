/* Import faunaDB sdk */
const faunadb = require("faunadb");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  // TODO setup structured logging
  console.log("Function `game-update` invoked", data.timestamp, data.game.code);
  const { timestamp, game } = data;
  /* construct the fauna query */
  const queryByGameCode = q.Get(q.Match(q.Index("games_by_code"), game.code));
  const queryUpdateIfUpToDate = q.If(
    q.Equals(timestamp, q.Select("ts", queryByGameCode)),
    q.Update(q.Select("ref", queryByGameCode), {
      data: game,
    }),
    { error: "Conflict" }
  );

  const query = q.Do(queryByGameCode, queryUpdateIfUpToDate);

  return client
    .query(query)
    .then(response => {
      if (response.error === "Conflict") {
        return {
          statusCode: 409,
          body: JSON.stringify(response),
        };
      }
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch(error => {
      console.log("error", error);
      /* Error! return the error with statusCode 400 */
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });
};
