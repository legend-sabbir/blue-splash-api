const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const customized = JSON.parse(fs.readFileSync('customized.json', 'utf8'));

const customizedMap = new Map(customized.data.map(s => [s.productId, s]));

const updatedData = products
  .map(p => {
    const item = customizedMap.get(p.productId);
    return Object.assign(p, item);
  })
  .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
  .filter(p => p.stock > 0)
  .map(p => {
    const obj = p
    delete obj._id
    delete obj.stock
    delete obj.order
    return obj
  })

fs.writeFileSync("data.json", JSON.stringify(updatedData));