// handle searching for keywords
const postHelpers = require('./postHelpers.js')

function searchAllPosts(key, searchterm, allPosts) {
    let returnPosts = []
    for (var i = 0; i < allPosts.length; i++) {
        let post = allPosts[i]

        if (Object.keys(post).includes(key)) {
            for (var j = 0; j < post[key].length; j++) {
                if (post[key][j].includes(searchterm)) {
                    returnPosts.push(post)
                }
            }
        }
    }
    return returnPosts
}


function addPostsWithUniqueId(currentposts, addposts) {
    // removes duplicate posts, comparing both input lists
    let ids = []
    let r = []

    for (var i = 0; i < currentposts.length; i++) {
        ids.push(currentposts[i].uuid)
    }

    for (var i = 0; i < addposts.length; i++) {
        if (!ids.includes(addposts[i].uuid)) {
            r.push(addposts[i])
        }
    }
    return r
}


function search(searchterm, postsPerUser) {
    // search for searchterm
    const posts = postHelpers.getAllPosts(postsPerUser)
    let returnPosts = []
    if (searchterm.startsWith('#')) {
        // return posts that contain hashtag (substr)
        returnPosts = returnPosts.concat(searchAllPosts('hashtags', searchterm.slice(1), posts))
    } else if (searchterm.startsWith('@')) {
        // return posts that contain mentioned people (substr)
        returnPosts = returnPosts.concat(searchAllPosts('mentions', searchterm.slice(1), posts))
        for (const key of Object.keys(postsPerUser)) {
            if (key.includes(searchterm.slice(1))) {
                returnPosts = addPostsWithUniqueId(returnPosts, returnPosts.concat(postsPerUser[key]))
            }
        }
    } else {
        // if neither # or @ present, still search for hashtags and mentions
        returnPosts = returnPosts.concat(searchAllPosts('hashtags', searchterm, posts))
        returnPosts = addPostsWithUniqueId(returnPosts, returnPosts.concat(searchAllPosts('mentions', searchterm, posts)))
        for (const key of Object.keys(postsPerUser)) {
            if (key.includes(searchterm)) {
                returnPosts = addPostsWithUniqueId(returnPosts, returnPosts.concat(postsPerUser[key]))
            }
        }
    }
    return returnPosts
}


module.exports = {
    search
}