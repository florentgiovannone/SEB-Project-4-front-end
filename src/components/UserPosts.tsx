import React, { useState } from "react"
import PostCardFull from "./PostcardFull"

import { IPost } from "../interfaces/post"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import axios from "axios"
import { useParams } from "react-router-dom"
// import { baseUrl } from "../config";

type Posts = null | Array<IPost>
function UserPosts() {
    const [posts, setPosts] = React.useState<Posts>(null)

    const { userId } = useParams()
    
    const [neededUser, setUser] = React.useState<IUser | null>(null)
    React.useEffect(() => {
console.log("user ID", userId);

        async function fetchUser() {
            const resp = await fetch(`/api/users/${userId}`)
            console.log(resp);
            const userData = await resp.json()
            setUser(userData)
        }
        fetchUser()
    }, [])
    console.log(neededUser?.email);


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
            <h1 className="title has-text-centered is-rouge mt-6">{`${neededUser?.username}'s stream `}</h1>

                <div className="columns has-text-centered is-centered is-multiline mt-5">
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
                        if (neededUser?.id === post.user.id) {
                        return <PostCardFull
                                key={post.id}
                                {...post}
                            />
                    }
                    
                    })}
                </div>
            <div className="columns has-text-centered is-centered is-multiline mt-5">
                <a href={`/mystream`}><button className="button is-outlined is-primary m-2">Back to My stream</button></a>
            </div>

    </section>

        <Footer />
    </>)
}
export default UserPosts