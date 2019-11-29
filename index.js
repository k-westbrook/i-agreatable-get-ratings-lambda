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

    let resultsArray = results.rows;
    let userRatingNumber = 0;
    let userRatingTotal = 0;
    let ratingsInfo = {};

    for (let i = 0; i < resultsArray.length; i++) {
      userRatingNumber++;
      userRatingTotal += parseInt(resultsArray[i].rating, 10);
    }


    ratingsInfo.userRatingNumber = userRatingNumber;
    if (userRatingNumber > 0) {
      ratingsInfo.userRatingTotal = userRatingTotal;
      ratingsInfo.userRatingAverage = userRatingTotal / userRatingNumber;
    }

    let response =
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(ratingsInfo),

    };
    return response;

  } catch (err) {
    return err;
  }
}

