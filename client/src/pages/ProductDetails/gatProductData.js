export default function getProductData(products, cart, id) {
  let product;
  product = cart.find((product) => product._id === id);
  if (product === undefined) {
    product = products.find((product) => product._id === id);
  }
  return product;
}
