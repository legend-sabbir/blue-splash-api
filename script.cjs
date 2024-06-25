const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const brooch = data.filter(p => p.category === "brooch");
const nonBrooch = data.filter(p => p.category !== "brooch");
const updatedData = [...nonBrooch, ...brooch].filter(p => p.stock > 0).map(p => {
  delete p.stock
  delete p._id
  return p
});

fs.writeFileSync("data.json", JSON.stringify(updatedData));