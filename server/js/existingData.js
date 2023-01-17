// test data

let postsPerUser = {
    'SpaceX': [
        { hashtags: ['hashtag'], username: 'SpaceX', content: "Falcon 9 launches SpaceX’s sixth dedicated #hashtag smallsat rideshare mission – completing our 200th successful launch!", id: "vnufydfoiww", datetime: "2023-01-13 21:12:19" },
        { username: 'SpaceX', content: "For SpaceX’s first launch of 2023, we’re targeting 9:56 a.m. ET on Tuesday, January 3 for Falcon 9’s sixth dedicated smallsat rideshare mission to orbit http://spacex.com/launches", id: "nvyuyuwlpper", datetime: "2023-01-13 21:07:14" },
        { username: 'SpaceX', content: "On average, SpaceX launched every 6 days from one of our three sites with 92% of missions completed with flight-proven first stage rocket boosters, and Falcon 9 now holds the world record for most launches of a single vehicle type in a single year", id: "93g9bvee", datetime: "2023-01-13 21:07:19" },
        { mentions: ['space_station'], username: 'SpaceX', content: "Most importantly, SpaceX successfully delivered our customers’ payloads to orbit, deployed additional Starlink satellites that add more capacity to our network, and flew critical cargo and astronauts to the @space_station and safely returned them back home Earth", id: "ncyyryowowui3", datetime: "2023-01-13 21:07:20" },
        { username: 'SpaceX', content: "Following stage separation, Falcon 9’s first stage will land on the A Shortfall of Gravitas droneship which is stationed down range in the Atlantic Ocean", id: "bvyfuixyebrq", datetime: "2023-01-13 21:07:12" },
        { username: 'SpaceX', content: "Targeting Wednesday, December 28 for Falcon 9’s launch of 54 Starlink satellites to low-Earth orbit from SLC-40 in Florida; teams are keeping an eye on weather conditions for booster recovery → http://spacex.com/launches", id: "vnfuytshrhyw", datetime: "2023-01-13 21:10:10" },
        { username: 'SpaceX', content: "Falcon 9’s first stage has landed on the Just Read the Instructions droneship, completing the 15th launch and landing of this booster!", id: "sdngbbuibpve", datetime: "2023-01-13 21:11:20" },
    ],

    'LexFridman': [
        { username: 'LexFridman', content: "Here's my conversation with Guido van Rossum creator of Python, one the most popular and impactful programming languages in the world. We talk all about the future of programming, from the philosophical to the technical. This was super fun!", id: "sdbvubsdilba", datetime: "2023-01-13 21:09:12" },
        { mentions: ['GMHikaru', 'MagnusCarlsen'], username: 'LexFridman', content: "Here's my conversation with Hikaru Nakamura @GMHikaru, one of the best chess players in the world & a top chess streamer. We talk about his games with @MagnusCarlsen & others, plus psychology of chess & the cheating scandal. ", id: "sdbvruietty", datetime: "2023-01-13 21:07:21" },
        { hashtags: ['hashtag'], username: 'LexFridman', content: "Sometimes a kind word from a stranger can make #hashtag me completely forget whatever concerns were weighing heavy on my heart. Kindness like that is a small gift that can make the biggest difference. I was lucky to get that today. I'll try to pass it on tomorrow.", id: "sbdsbddfjkbsukjdfa", datetime: "2023-01-13 21:08:19" },
        { username: 'LexFridman', content: "When I program, I'm leveraging the work of millions of other people, including code in libraries, compilers, operating systems, computer networks, and the complex web of hardware infrastructure that makes the whole thing run. It's fun being 1 curious human among 8 billion others.", id: "sdkbfnsuidbifld", datetime: "2023-01-13 21:07:27" },
        { username: 'LexFridman', content: "I'm excited for Twitter in 2023. Improving it is fundamentally a collection of tough engineering problems. I refuse to believe that large companies can't innovate by doing great novel design and engineering. They can. It's a question of leadership and culture.", id: "asbsgshdgbioa", datetime: "2023-01-13 21:07:18" },
        { username: 'LexFridman', content: "Food poisoning floored me for several days. It's funny that one late-night snack took me on a wild mental journey 🤣 It was fun to learn the places my mind will go when in fever. I wasn't able to think, but was able to distinctly appreciate the finiteness and absurdity of life.", id: "dwagbsgdbogasg", datetime: "2023-01-13 21:07:26" },
    ],
    'GMHikaru': [
        { username: 'GMHikaru', content: "Well that was an amazing World Cup! And now for something a little more hype, can we have some energy for CHESS?!?", id: "sbwddghhahfagg", datetime: "2023-01-13 21:07:25" },
        { username: 'GMHikaru', content: "I'm still in Hawaii, but I'll be back and will put in some hours before getting on another plane and heading halfway 'round the world. Hope to see you all in chat this week!", id: "sd0ysgehsehe", datetime: "2023-01-13 21:07:17" },
        { username: 'GMHikaru', content: "I came up a little bit short today in the Chess Global Championship but credit to Wesley So for his consistent play. Winning 1/2 of the major events over the last two weeks is more than I could have expected as a mere streamer!", id: "802segfhseghwege", datetime: "2023-01-13 21:07:16" },
        { username: 'GMHikaru', content: "tarting day 2 of Fischer Random World Chess Champs. All of your support helped and I'm in the lead. Playing the fierce BigFish today, Fedoseev. Odd pairings mean I play him all day today.", id: "abwogfaegrgth", datetime: "2023-01-13 21:07:22" },

    ],
    'MagnusCarlsen': [
        { username: 'MagnusCarlsen', content: "Good thing the Inter game is not close, so I can focus on chess and Barcelona on the Europa League", id: "awfagahdhr", datetime: "2023-01-13 21:07:24" },
        { username: 'MagnusCarlsen', content: "There is a lot of smart people in Chess. They’ll figure it out at some point. I am sure.", id: "znbdrjzurzds", datetime: "2023-01-13 21:07:15" },
        { username: 'MagnusCarlsen', content: "Now that Alireza has gone back to his bullet roots, I'm sure he'll be inspired and win tomorrow!", id: "AGWjdtjfft", datetime: "2023-01-13 21:07:14" },

    ],
    'username1': [
        { username: 'username1', content: "Good thing the Inter game is not close, so I can focus on chess and Barcelona on the Europa League", id: "awfagahdhr", datetime: "2023-01-13 21:07:23" },
        { username: 'username1', content: "There is a lot of smart people in Chess. They’ll figure it out at some point. I am sure.", id: "znbdrjzurzds", datetime: "2023-01-13 21:07:13" },
        { username: 'username1', content: "Now that Alireza has gone back to his bullet roots, I'm sure he'll be inspired and win tomorrow!", id: "AGWjdtjfft", datetime: "2023-01-13 21:07:12" },
    ]
}

let userFollows = {
    "username1": ["MagnusCarlsen", "LexFridman", "SpaceX"]
}

let userPasswords = {
    "username1": 'password',
    'username2': 'password'

}

module.exports = {
    postsPerUser,
    userFollows,
    userPasswords
}