// handle fetching posts
function getAllPosts(postsPerUser) {
    allPosts = []

    for (const value of Object.values(postsPerUser)) {
        for (var i = 0; i < value.length; i++) {
            allPosts.push(value[i])
        }
    }
    return allPosts
}


function getPostOfFollowing(username, numberPosts, postsPerUser, userFollows) {
    let posts = []
    let i = 0
    var k = 0;

    while (numberPosts > i) {
        // iterates over users and appends one post per user (alternating), until numberPosts is satisfied
        let noPostsLeft = true
        for (var j = 0; j < userFollows[username].length; j++) {
            const userFollow = userFollows[username][j]
            if (!Object.keys(postsPerUser).includes(userFollow) || postsPerUser[userFollow].length <= k) {
                continue
            } else {
                noPostsLeft = false
                posts.push(postsPerUser[userFollow][k])
                i += 1
            }
        }
        k += 1
        if (noPostsLeft) {
            break
        }
    }

    return posts
}


module.exports = {
    getAllPosts,
    getPostOfFollowing
}