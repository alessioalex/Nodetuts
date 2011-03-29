products = [
{
  id: 1,
  name: 'Mac Book Pro',
  description: 'Apple 13 inch Mac Book Pro Notebook',
  price: 1000
},
{
  id: 2,
  name: 'iPad',
  description: 'Apple 64GB 3G iPad',
  price: 899
}
];

module.exports.all = products;

module.exports.find = function(id) {
  id = parseInt(id, 10);
  var found = null;
  productloop: for(product_index in products) {
    var product = products[product_index];
    if(product.id == id) {
      found = product;
      break productloop;    
    }
  };
  return found;
}

module.exports.set = function(id, product) {
  id = parseInt(id, 10);
  product.id = id;
  products[id -1] = product;
}

module.exports.new = function() {
  return {
    name: '',
    description: '',
    price: 0
  };
}

module.exports.insert = function(product) {
  var id = products.length + 1;
  product.id = id;
  products[id-1] = product;
  return id;
}
