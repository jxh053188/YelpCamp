const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');

const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '607d9f63072a1650807c89d3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/dyumrzn5v/image/upload/v1618926341/YelpCamp/htyiggrvx3dm1mdj0d3x.jpg',
                filename: 'YelpCamp/htyiggrvx3dm1mdj0d3x'
            },
            {
                url: 'https://res.cloudinary.com/dyumrzn5v/image/upload/v1618926339/YelpCamp/h5urpnm40zl57ri4psin.jpg',
                filename: 'YelpCamp/h5urpnm40zl57ri4psin'
            }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor perspiciatis tempore autem modi pariatur placeat dignissimos earum aspernatur culpa cum rerum mollitia deleniti repellat, alias eaque architecto. Asperiores, tempora sequi.',
            price: price
        });
        await camp.save();
    }

}

seedDb().then(() => {
    mongoose.connection.close;
})