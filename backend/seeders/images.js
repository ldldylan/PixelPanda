// const mongoose = require("mongoose");
// const { mongoURI: db } = require('../config/keys.js');
// const User = require('../models/User');
// const Tweet = require('../models/Tweet');
// const Artwork = require('../models/Artwork');
// const DEFAULT_PROFILE_IMAGE_URL = 'https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/defaultprofile.jpg'; // <- Insert the S3 URL that you copied above here

// // Connect to database

// const seedImages = async () => {
// try {
//     await mongoose.connect(db, { useNewUrlParser: true });
//     console.log('Connected to MongoDB successfully');
//     await initializeImages();
// } catch (err) {
//     console.error(err.stack);
//     process.exit(1);
// }
// }
// seedImages();
// // Initialize image fields in db
// const initializeImages = async () => {
//     console.log("Initializing profile avatars...");
//     await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

//     console.log("Initializing Tweet image URLs...");
//     await Tweet.updateMany({}, { imageUrls: [] });

//     console.log("Initializing Artwork image URLs...");
//     await Artwork.updateMany({}, { ArtworkImageUrl: '' });
//     // await Artwork.updateMany
//     const artworks_for_image = await Artwork.find();

//     for (let i = 0; i < artworks_for_image.length && i < 40; i++) {
//         const artwork = artworks_for_image[i];
//         Artwork.updateOne(
//             { _id: artwork._id },
//             { ArtworkImageUrl: `https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/aws_mern/tachie+(${i + 100}).png` }
//         )
//             .then(() => console.log('Artwork updated successfully!'))
//             .catch((err) => console.error(err));
//     }
//     console.log("Done!");
//     mongoose.disconnect();
// }

const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Artwork = require('../models/Artwork');
const DEFAULT_PROFILE_IMAGE_URL = 'https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/defaultprofile.jpg';

const seedImages = async () => {
    try {
        const conn = await mongoose.connect(db, { useNewUrlParser: true });
        console.log('Connected to MongoDB successfully');
        await initializeImages();
        conn.disconnect();
    } catch (err) {
        console.error(err.stack);
        process.exit(1);
    }
}

const initializeImages = async () => {
    // console.log("Initializing profile avatars...");
    // await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

    console.log("Initializing Tweet image URLs...");
    await Tweet.updateMany({}, { imageUrls: [] });

    console.log("Initializing Artwork image URLs...");
    await Artwork.updateMany({}, { ArtworkImageUrl: '' });
    const users_for_image = await User.find();

    for (let i = 0; i < users_for_image.length && i < 10; i++) {
        const user = users_for_image[i];
        await User.updateOne(
            { _id: user._id },
            { profileImageUrl: `https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/profiles/profile+(${i + 1}).png` }
        );
        // console.log(artwork)
        console.log('User updated successfully!');
    }
    // const new_artworks = await Artwork.find();
    // console.log(new_artworks);
    // console.log("Done!");

    const artworks_for_image = await Artwork.find();

    for (let i = 0; i < artworks_for_image.length && i < 40; i++) {
        const artwork = artworks_for_image[i];
        await Artwork.updateOne(
            { _id: artwork._id },
            { ArtworkImageUrl: `https://aws-mern-pixelpanda.s3.us-west-1.amazonaws.com/aws_mern/tachie+(${i + 100}).png` }
        );
        // console.log(artwork)
        console.log('Artwork updated successfully!');
    }
    const new_artworks = await Artwork.find();
    console.log(new_artworks);
    console.log("Done!");
}

seedImages();
