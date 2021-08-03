export default function getProductData(products, cart, id) {
  let product;
  product = cart.find((product) => product.documentID === id);
  if (product === undefined) {
    product = products.find((product) => product.documentID === id);
  }
  return product;
}
