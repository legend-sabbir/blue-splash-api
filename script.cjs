const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const customized = JSON.parse(fs.readFileSync('customized.json', 'utf8'));

const customizedMap = new Map(customized.data.map(s => [s.productId, s]));

const updatedData = products.map(p => {
  const item = customizedMap.get(p.productId);
  const obj = Object.assign(p, item);
  delete obj._id
  return obj
}).sort((a, b) => a.order - b.order);

fs.writeFileSync("data.json", JSON.stringify(updatedData));