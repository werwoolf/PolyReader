fetch("https://api.reverso.net/translate/v1/translation", {
  "headers": {
    "content-type": "application/json"
  },
  "body": JSON.stringify({
    "format": "text",
    "from": "eng",
    "to": "ukr",
    "input": "cloud",
    "options": {"origin": "translation.web",}
  }),
  "method": "POST"
})
  .then(res => res.json())
  .then(data => {
  console.log(data);
});
