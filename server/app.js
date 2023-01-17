const express = require('express');
const app = express();
const path = require('path');


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    next();
});


// helpers
const helpers = require('./js/helpers.js')

// fetch posts
const postHelpers = require('./js/postHelpers.js')

// post posts
const postExtractors = require('./js/postExtractors.js')

// search in the search bar
const search = require('./js/search.js')

// testing user & post data
let data = require('./js/existingData.js')
let postsPerUser = data.postsPerUser
let userFollows = data.userFollows
let userPasswords = data.userPasswords



// FOLLOWING
// user, followuser=elonmusk
app.post("/api/userfollows", (req, res) => {
    if (!Object.keys(userFollows).includes(req.query.user)) {
        userFollows[req.query.user] = []
    }
    userFollows[req.query.user].push(req.query.followuser)
    res.sendStatus(200);
})


// user, unfollowuser
app.post("/api/userunfollows", (req, res) => {
    try {
        // delete userFollows[req.query.user][req.query.followuser]

        userFollows[req.query.user] = userFollows[req.query.user].filter(x => x !== req.query.followuser);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(404).sendStatus(error);
    }


})


// POST a POST
// user, content
app.post("/api/birdpost", (req, res) => {
    if (!Object.keys(postsPerUser).includes(req.query.user)) {
        postsPerUser[req.query.user] = []
    }
    const hashtags = postExtractors.extractHashtags(req.query.content)
    const mentions = postExtractors.extractMentions(req.query.content)
    postsPerUser[req.query.user].push({ username: req.query.user, content: req.query.content, id: req.query.uuid, datetime: helpers.getDatetime(), hashtags: hashtags, mentions: mentions }); //uuidv4()
    console.log(postsPerUser)
    res.sendStatus(200);
})


/* app.get('/api/birdposts', (req, res) => res.json(postsPerUser));

app.get('/api/getbirdpost/:emplId', (req, res) => {
    const matchingEmployees = postsPerUser.filter(a => a.username === req.params.emplId);
    if (matchingEmployees.length <= 0) {
        res.sendStatus(404);
    }
    res.json(matchingEmployees[0])
}); */

// GET POSTS


app.get('/api/getUserPosts/:username', (req, res) => {
    /*   const matchingPosts = postsPerUser.filter(a => a.username === req.params.username); */

    if (!Object.keys(postsPerUser).includes(req.params.username)) {
        if (Object.keys(userPasswords).includes(req.params.username)) {
            postsPerUser[req.params.username] = []
            res.json(postsPerUser[req.params.username])
        } else {
            res.sendStatus(400);

        }
    } else {
        res.json(helpers.sortByDate(postsPerUser[req.params.username]))
    }
});


app.get('/api/getUserFeed/:username', (req, res) => {

    const username = req.params.username
    let r = null
    let allPosts = postHelpers.getAllPosts(postsPerUser)
    if (!Object.keys(userFollows).includes(username) || userFollows[username].length == 0) {
        // get random posts
        r = helpers.chooseNRandomWithoutReplacement(allPosts, 10)
        // console.log(r)

    } else { // get latest posts of people following
        r = helpers.sortByDate(postHelpers.getPostOfFollowing(username, 10, postsPerUser, userFollows))
    }

    res.json(helpers.sortByDate(r))
});


// check if user follows
app.get('/api/getUserFollowing/:username/:followuser', (req, res) => {

    const username = req.params.username
    const followuser = req.params.followuser
    // console.log(userFollows[username])
    // console.log(userFollows[username],userFollows[username].includes(followuser),followuser)
    if (!Object.keys(userFollows).includes(username)) {
        res.json(false)
    } else if (!userFollows[username].includes(followuser)) {
        res.json(false)
    } else {
        res.json(true)
    }

});


app.get('/api/search/:searchterm', (req, res) => {

    const searchterm = req.params.searchterm
    let searchResults = search.search(searchterm, postsPerUser)
    res.json(helpers.sortByDate(searchResults))
});


// LOGIN
// username password
app.get('/api/login', (req, res) => {

    if (!Object.keys(userPasswords).includes(req.query.username)) {
        res.sendStatus(404) // .sendStatus('user not found') // user not found
    } else if (userPasswords[req.query.username] != req.query.password) {
        res.sendStatus(403) // .sendStatus('wrong password') // wrong password
    } else {
        res.json({ 'w': 'e' })
        res.sendStatus(200) // .sendStatus('login success') // login success

    }

});


// SIGNUP
// username password
app.get('/api/signup', (req, res) => {

    if (Object.keys(userPasswords).includes(req.query.username)) {
        res.sendStatus(404) // .sendStatus('user does already exist'); // user does already exist

    } else {
        userPasswords[req.query.username] = req.query.password
        userFollows[req.query.username] = []
        postsPerUser[req.query.username] = []

        res.sendStatus(200) // .sendStatus('signup success') // login success
    }

});


app.get('/', (req, res) => {
    res.sendStatusFile(path.join(__dirname, '/index.html'));
});


module.exports = app;