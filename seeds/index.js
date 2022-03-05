const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '620db5f203bcba2703030b26',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quas quisquam nam ipsum cupiditate cumque voluptate culpa doloremque, molestias quidem voluptatibus animi eius. Voluptates, molestias quam delectus ad doloribus dicta?',
            price,
            geometry: {
              type:"Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dc3gnpnyz/image/upload/v1645838029/YelpCamp/ndm7hxllovjjnsfnuase.jpg',
                  filename: 'YelpCamp/ndm7hxllovjjnsfnuase',
                },
                {
                  url: 'https://res.cloudinary.com/dc3gnpnyz/image/upload/v1645838030/YelpCamp/df2fbuvuuwbxqkfpy97m.jpg',
                  filename: 'YelpCamp/df2fbuvuuwbxqkfpy97m',
                }
              ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});