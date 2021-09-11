const faunadb = require("faunadb");
q = faunadb.query;

const handler = async (event) => {
  try {
    //only allow post
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method not Allowed" };
    }

    //data ko change krrhe hain stringify data ko object mein , take hm data ko send krsakein faunadb mein object se.
    //parse se data ko change krte hain object mein
    let reqObj = JSON.parse(event.body);

    const client = new faunadb.Client({
      secret: "fnAESd2OZpACTMenvs0bXUZyTrmV9f1SaikDnJID",
    });

    const result = await client.query(
      // q.Create(q.Collection("directoryforpostformik"), {
      //   data: { name: reqObj.name, age: reqObj.age },
      // })
      q.Create(q.Collection("directory"), {
        data: { name: reqObj.name, age: reqObj.age },
      })
    );

    console.log("Entry Created and Inserted in Container: " + result.ref.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: `${result.ref.id}` }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
