const faker = require('faker')

const products = []
const getImage = (idx) => `https://loremflickr.com/320/240/item=${idx}`

for(let count = 0; count < 10; count++) {
  products.push({
    id: count + 1,
    name: faker.commerce.productName(),
    imageSrc: getImage(count),
    imageAlt: faker.commerce.productAdjective(),
    price: faker.commerce.price(),
    color: faker.commerce.color()
  })
}

// const products = [
//     {
//       id: 1,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: '35',
//       color: 'Black',
//     }
//   ];

  export default products;