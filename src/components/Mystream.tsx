import React, { useState } from "react"
import PostCardFull from "./PostcardFull"
import { IPost } from "../interfaces/post"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import axios from "axios"
// import { baseUrl } from "../config";

type Posts = null | Array<IPost>
function postList() {
    const [posts, setPosts] = React.useState<Posts>(null)
    const [currentUser, updateCurrentUser] = useState<IUser | null>(null);

    async function fetchUser() {
        const token = localStorage.getItem('token')
        const resp = await axios.get(`/api/user`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        updateCurrentUser(resp.data)
    }

    React.useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) fetchUser()
    }, [])

    React.useEffect(() => {
        async function fetchPosts() {
            const resp = await fetch(`/api/posts`)
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
        return posts?.filter((post: { title: string }) => {
            const lowerSearch = search.toLowerCase();
            const lowerPostName = post.title.toLowerCase();

            return lowerPostName.includes(lowerSearch);
        });
    }
    const filteredLength: any = filterPosts()?.length

    return (<>
    <section className="section">
        <div className="container has-text-centered">
            <h1 className="title has-text-centered is-rouge mt-6">My Stream</h1>

                <div className="columns has-text-centered is-centered is-multiline mt-5">
                    <a href={`/dashboard`}><button className="button is-outlined is-primary m-2">See Account</button></a>
                    <a href="/user"><button className="button is-outlined is-primary m-2">Search users</button></a>
                </div>
                <input
                    className="input background-is-rouge is-rounded"
                    placeholder="Search character..."
                    onChange={handleChange}
                    value={search}
                />
                {filteredLength === 0 && <div className="account  has-text-centered background-is-grey">
                    <p className="text is-black ">Cannot find your post ?</p>
                    <a href="/create"><button className="button  mb-3">Create new Post</button></a>

                </div>}

            </div>
                <div className="container">
                    {filterPosts()?.map((post) => {
                        if (currentUser?.id === post.user.id) {
                        return <PostCardFull
                                key={post.id}
                                {...post}
                            />
                    }
                    
                    })}
                </div>


    </section>

        <Footer />
    </>)
}
export default postList