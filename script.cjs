const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const customized = JSON.parse(fs.readFileSync('customized.json', 'utf8'));

const customizedMap = new Map(customized.data.map(s => [s.productId, s]));

const updatedData = products
  .map(p => {
    const item = customizedMap.get(p.productId);
    return Object.assign(p, item);
  })
  .sort((a, b) => a.order - b.order)
  .map(p => {
    delete p._id
    delete p.stock
    delete p.order
    return p
  })
  .filter(p => p.stock > 0);

fs.writeFileSync("data.json", JSON.stringify(updatedData));