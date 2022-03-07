"use strict";
const { faker } = require("@faker-js/faker");

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const createFakeUser = () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "123",
    isAdmin: faker.datatype.boolean(),
  });

  // const createFakeProduct = () => ({
  //   name: faker.commerce.product(),
  //   pennies: faker.datatype.number({ min: 1, max: 100000 }),
  //   imageUrl: faker.image.fashion(),
  //   description: faker.lorem.lines(3),
  // });

  const createAdmin = () => ({
    username: "Dan",
    email: faker.internet.email(),
    password: "123",
    isAdmin: true,
  });

  const createCustomer = () => ({
    username: "David",
    email: faker.internet.email(),
    password: "123",
    isAdmin: false,
  })

  const createFakeProduct = [
    {name: 'Slim Long Sleeve Henley', pennies: 3800, imageUrl: 'https://images.express.com/is/image/expressfashion/0036_05051977_0010_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Solid Y-Neck Merino Cardigan', pennies: 10800, imageUrl: 'https://images.express.com/is/image/expressfashion/0021_01805887_2676_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Solid Fleece Hoodie', pennies: 7400, imageUrl: 'https://images.express.com/is/image/expressfashion/0022_05328904_0947_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Extra Slim Solid Suit', pennies: 12800, imageUrl: 'https://images.express.com/is/image/expressfashion/0039_03253425_2199_7_fb?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Extra Slim Dress Shirt', pennies: 60000, imageUrl: 'https://images.express.com/is/image/expressfashion/0020_06032996_0830_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},

    {name: 'Slim Vintage Wash Jeans', pennies: 8800, imageUrl: 'https://images.express.com/is/image/expressfashion/0024_02847527_0018_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Straight Fit Jeans', pennies: 9800, imageUrl: 'https://images.express.com/is/image/expressfashion/0024_02757537_0020_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Skinny Chino', pennies: 8800, imageUrl: 'https://images.express.com/is/image/expressfashion/0025_03083390_2584_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Knit Joggers', pennies: 3900, imageUrl: 'https://images.express.com/is/image/expressfashion/0025_03043516_2699_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Slim Solid Suit Pants', pennies: 9800, imageUrl: 'https://images.express.com/is/image/expressfashion/0039_03253521_0344_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},

    {name: 'Off The Shoulder Tee', pennies: 3000, imageUrl: 'https://images.express.com/is/image/expressfashion/0086_06347063_0259_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Ruffle Neck Shirt', pennies: 5000, imageUrl: 'https://images.express.com/is/image/expressfashion/0097_09707650_0058_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'High Neck Cutout Tank', pennies: 5400, imageUrl: 'https://images.express.com/is/image/expressfashion/0086_06419959_0011_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Lapel Blazer', pennies: 14800, imageUrl: 'https://images.express.com/is/image/expressfashion/0078_06740703_0058_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Hi-Lo Maxi Dress', pennies: 9800, imageUrl: 'https://images.express.com/is/image/expressfashion/0094_07856782_0259_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},

    {name: 'High Waisted Cropped Straight Pants', pennies: 8000, imageUrl: 'https://images.express.com/is/image/expressfashion/0092_07482053_0587_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'High Waisted Skinny Jeans', pennies: 4000, imageUrl: 'https://images.express.com/is/image/expressfashion/0091_07190784_0019_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Twill Bootcut Pants', pennies: 8000, imageUrl: 'https://images.express.com/is/image/expressfashion/0092_07241099_0058_f012?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'High Waisted Ripped Skinny Jeans', pennies: 4400, imageUrl: 'https://images.express.com/is/image/expressfashion/0091_07190786_0018_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Tipped Sweater Pencil Skirt', pennies: 8000, imageUrl: 'https://images.express.com/is/image/expressfashion/0093_07650235_0058_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},

    {name: 'Twice Hat', pennies: 4000, imageUrl: 'https://cdn.shopify.com/s/files/1/0267/1371/8831/products/Dad-Hat-Front.png?v=1590539501', description: faker.lorem.lines(4)},
    {name: 'Leather Plaque Belt', pennies: 4800, imageUrl: 'https://images.express.com/is/image/expressfashion/0034_04610540_0474_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Leather Buckle Belt', pennies: 4800, imageUrl: 'https://images.express.com/is/image/expressfashion/0034_04615439_0486_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Textured Solid Tie', pennies: 4800, imageUrl: 'https://images.express.com/is/image/expressfashion/0034_04587811_1903_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Micro Stripe Tie', pennies: 4800, imageUrl: 'https://images.express.com/is/image/expressfashion/0034_04587518_2624_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},

    {name: 'Double O-Ring Belt', pennies: 4000, imageUrl: 'https://images.express.com/is/image/expressfashion/0004_01021314_0058_f001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Skinny Gold Buckle Belt', pennies: 4000, imageUrl: 'https://images.express.com/is/image/expressfashion/0006_01015085_0058_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Diamond Hoop Earrings', pennies: 2400, imageUrl: 'https://images.express.com/is/image/expressfashion/0008_00764025_0414_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Block Heel Sock Booties', pennies: 7800, imageUrl: 'https://images.express.com/is/image/expressfashion/0095_00415945_0474_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
    {name: 'Buckle Heeled Sandals', pennies: 7800, imageUrl: 'https://images.express.com/is/image/expressfashion/0095_09870267_0058_a001?cache=on&wid=960&fmt=jpeg&qlt=85,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon', description: faker.lorem.lines(4)},
  ];

  const productsArray = [];
  for (let i = 0; i < 30; i++) {
    productsArray.push(createFakeProduct[i]);
  }

  const products = await Promise.all(
    productsArray.map((current) => {
      return Product.create(current);
    })
  );

  const usersArray = [];
  for (let i = 0; i < 10; i++) {
    if (i === 1) usersArray.push(createAdmin());
    else if (i === 2) usersArray.push(createCustomer());
    else usersArray.push(createFakeUser());
  }

  let orders = [];
  const users = await Promise.all(
    usersArray.map(async (current) => {
      const tempUser = await User.create(current);
      const tempOrder = await tempUser.createOrder();
      await tempOrder.addProduct(Math.floor(Math.random() * (30 - 1) + 1), {
        through: { quantity: 5 },
      });
      orders.push(tempOrder);
      return tempUser;
    })
  );

  console.log(User);
  console.log(Product);
  console.log(Order);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} orders`);

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
