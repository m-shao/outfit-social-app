import Post from "./Post"

import pfp from '../images/pfp.png'
import woman from '../images/woman.png'

import man from '../images/man.png'
import pfp2 from '../images/pfp2.png'

function Posts() {

    //fetch posts from database

    const users = {
        'person123': {
            'pfp': pfp,
            'name': 'person123'
        },
        'testman321': {
            'pfp': pfp2,
            'name': 'testman321'
        }
    }

    const posts = {
        '1':{
            'username': 'person123',
            'pfp': pfp,
            'image': woman,
            'tags': ['tag1', 'tag2', 'tag3'],
            'likeCount': 123,
            'caption': 'Insert nice quirky caption here. I chose this outfit using this awesome social media app. omg, i love wearing clothes because I would be arrested if i didn’t wear it',
            'comments': {
                'user': {'date':'date', 'content': 'content'},
            }
        },
        '2':{
            'username': 'testman321',
            'pfp': pfp,
            'image': man,
            'tags': ['tag1', 'tag2', 'tag3'],
            'likeCount': 123,
            'caption': 'Insert nice quirky caption here. I chose this outfit using this awesome social media app. omg, i love wearing clothes because I would be arrested if i didn’t wear it',
            'comments': {
                'user': {'date':'date', 'content': 'content'},
            }
        },
    }

    return (
        <div>
            {Object.keys(posts).map((post) => {
                return <Post
                    key={post}
                    image={posts[post].image}
                    user={users[posts[post].username]}
                    caption={posts[post].caption}
                    likes={posts[post].likeCount}/>
            })}
        </div>
    )
}

export default Posts