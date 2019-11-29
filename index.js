var { Client } = require('pg')
exports.handler = async function (event) {
  try {
    const client = new Client({
      host: process.env.HOST_REFERENCE,
      user: process.env.USER_NAME,
      password: process.env.PASSWORD_REFERENCE,
      database: process.env.DATABASE_NAME
    });
    await client.connect();
    let results = await client.query(`SELECT rating
    FROM public."ratings" WHERE restaurant_id = ${event.pathParameters.restaurantId};`);

    console.log(results.rows)
    let response =
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(results.rows),

    };
    return response;

  } catch (err) {
    return err;
  }
}

