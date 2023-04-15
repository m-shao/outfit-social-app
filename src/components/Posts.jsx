import Post from "./Post"

import pfp from '../images/pfp.png'
import woman from '../images/woman.png'

import man from '../images/man.png'
import pfp2 from '../images/pfp2.png'

function Posts() {
  return (
    <div>
        <Post
          image={woman}
          user={{
              'pfp': pfp,
              'name': 'person123'
          }}
          caption={"Insert nice quirky caption here. I chose this outfit using this awesome social media app. omg, i love wearing clothes because I would be arrested if i didn’t wear it"}
          likes={123}/>
        <Post
          image={man}
          user={{
              'pfp': pfp2,
              'name': 'testman321'
          }}
          caption={"Insert nice quirky caption here. I chose this outfit using this awesome social media app. omg, i love wearing clothes because I would be arrested if i didn’t wear it"}
          likes={123}/>
        
    </div>
  )
}

export default Posts