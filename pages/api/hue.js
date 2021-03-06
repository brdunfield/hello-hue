export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const url = "http://" + process.env.BRIDGEIP + "/api/" + process.env.BRIDGEUSER + "/lights/" + body.id + "/state";

  //console.log(JSON.stringify(body.state));

  // do the request
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body.state)
  }).then(response => response.json())
  .then(data => {
    if(data[0].error)
      res.status(200).json({ error: data[0].error.description });
    else {
      res.status(200).json({ statusUpdated: true });
    }
  });
}