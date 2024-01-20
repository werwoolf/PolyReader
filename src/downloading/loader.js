const pako = require("pako");
const fs = require("node:fs");

const bookPath = "https://2books.su/reader/books/fight-club-chuck-palahniuk/pages/";

(async () => {
  try {
    for (let i = 0; true; i++) {
      const res = await fetch(`${bookPath}${i}.json.gz`);

      if (!res.ok) break;

      const buffer = await res.arrayBuffer();
      const inflated = pako.inflate(buffer, {to: 'string'});

      const {tokens1, tokens2} = JSON.parse(inflated);

      fs.appendFile(`./FightClub/${i}.json`, inflated, (err)=>{
        if(err){
          console.log(`err while create ${i} file}`,err)
        }
        console.log(i, " file created")
      });

      console.log(tokens1.length, " ", i)
    }
  } catch (e) {
    console.log(e)
  }
})()

