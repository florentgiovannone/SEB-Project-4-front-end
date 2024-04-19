import React from "react"
import PostCardFull from "./PostcardFull"
import Post from "./Post"
import { IPost } from "../interfaces/post"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import { baseUrl } from "../config";

type Posts = null | Array<IPost>
function postList({ user }: { user: null | IUser }) {
    const [posts, setPosts] = React.useState<Posts>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const resp = await fetch(`${baseUrl}/posts`)
            const data = await resp.json()
            setPosts(data)
        }
        fetchPosts()
    }, [])
    console.log(posts);
    

    const [search, setSearch] = React.useState("");

    function handleChange(e: any) {
        setSearch(e.currentTarget.value);
    }

    function filterPosts() {
        return posts?.sort((a: any, b: any) => b.post_date - a.post_date).filter((post: { title: string }) => {
            const lowerSearch = search.toLowerCase();
            const lowerPostName = post.title.toLowerCase();

            return lowerPostName.includes(lowerSearch);
        });
    }
    const filteredLength: any = filterPosts()?.length

    return (<>
        <section className="section p-0" >
            <div className="columns is-centered ">
                <div className="container m-0 p-0">
            <Post  />
                <input
                    className="input background-is-rouge is-rounded mb-6 "
                    placeholder="Search character..."
                    onChange={handleChange}
                    value={search}
                />
                {filteredLength === 0 && <div className="account  has-text-centered background-is-grey ">
                    <p className="text is-black ">Cannot find your post ?</p>
                    <a href="/create"><button className="button  mb-3">Create new Post</button></a>

                </div>}
                    <div className="columns is-multiline is-centered mb-6">
                    {filterPosts()?.map((post) => {
                        return <PostCardFull
                                key={post.id}
                                {...post}
                            />
                    })}
                    
                </div>
                
                </div>
            </div>
    </section>

        <Footer />
    </>)
}
export default postList