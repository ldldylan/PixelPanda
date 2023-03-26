const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Artwork = require('../models/Artwork');
const Review = require('../models/Review');
const CartItem = require('../models/CartItem');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_ARTWORKS = 40;
const NUM_SEED_REVIEWS = 80;
// Create users
const users = [];
console.log('creating users...')

users.push(
  new User ({
    // username: 'demo-user',
    email: 'demo-user@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    // username: 'dilang',
    email: 'dilang@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  }) 
)

users.push(
  new User ({
    // username: 'kenny',
    email: 'kenny@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    // username: 'james',
    email: 'james@gmail.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      // username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}

console.log('creating artworks...')
// Create artworks
const artworks = [];

for (let i = 0; i < NUM_SEED_ARTWORKS; i++) {
  const adjective1 = faker.hacker.adjective();
  const adjective2 = faker.hacker.adjective();
  const noun = faker.hacker.noun();
  const artworkName = `${adjective1} ${adjective2} ${noun}`;

  artworks.push(
    new Artwork ({
      name: artworkName,
      description: faker.hacker.phrase(),
      price: parseFloat((Math.random() * 99 + 1).toFixed(2)),
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
      // ArtworkImageUrl
    })
    )
  }

const reviews = [];
  for (let i = 0; i < NUM_SEED_REVIEWS; i++) {
  reviews.push(
    new Review({
      rating: Math.floor(Math.random() * 5) + 1, 
      content: faker.hacker.phrase(),
      artworkId: artworks[Math.floor(Math.random() * NUM_SEED_ARTWORKS)]._id,
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id
    })
  )
}
console.log(reviews)

console.log('creating cart items' )




const insertSeeds = () => {
  console.log("Resetting db and seeding users.");

  User.collection.drop()
                  .then(() => Artwork.collection.drop())
                  .then(() => Review.collection.drop())
                  .then(() => CartItem.collection.drop())

                  .then(() => User.insertMany(users))
                  .then(() => Review.insertMany(reviews))

                  .then(() => Artwork.insertMany(artworks))
                  .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                  })
                  .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                  });
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

