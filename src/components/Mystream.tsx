import React, { useState } from "react"
import PostCardFull from "./PostcardFull"
import { IPost } from "../interfaces/post"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import axios from "axios"
import { baseUrl } from "../config";

type Posts = null | Array<IPost>
function postList() {
    const [posts, setPosts] = React.useState<Posts>(null)
    const [currentUser, updateCurrentUser] = useState<IUser | null>(null);

    async function fetchUser() {
        const token = localStorage.getItem('token')
        const resp = await axios.get(`${baseUrl}/user`, {
            headers: { Authorization: `Bearer ${token}` }

        })
        console.log(token)
        updateCurrentUser(resp.data)
    }

    React.useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) fetchUser()
    }, [])

    React.useEffect(() => {
        async function fetchPosts() {
            const resp = await fetch(`${baseUrl}/posts`)
            const data = await resp.json()
            setPosts(data)
        }
        fetchPosts()
    }, [])
    console.log(currentUser);


    const [search, setSearch] = React.useState("");

    function handleChange(e: any) {
        setSearch(e.currentTarget.value);
    }

    function filterPosts() {
        return posts?.filter((post: { category: string, title: string, content: string, categoryContent: string }) => {
            const lowerSearch = search.toLowerCase();
            const lowerPostCategory = post.category.toLowerCase();
            const lowerPostCategoryContent = post.categoryContent.toLowerCase();
            const lowerPostTitle = post.title.toLowerCase();
            // const lowerContent = post.content.toLowerCase();
            return lowerPostCategory.includes(lowerSearch) || lowerPostCategoryContent.includes(lowerSearch) || lowerPostTitle.includes(lowerSearch)
        });
    }
    const filteredLength: any = filterPosts()?.length

    return (<>
        <section className="section">
            <div className="container has-text-centered">
                <h1 className="title has-text-centered mt-6">My Stream</h1>

                <div className="columns has-text-centered is-centered is-multiline mt-5">
                    <a href={`/dashboard`}><button className="button is-outlined is-primary m-2">See My account</button></a>
                    <a href="/user"><button className="button is-outlined is-primary m-2">Search other users</button></a>
                </div>
                <input
                    className="input has-border-green is-rounded mb-6"
                    placeholder="Search character..."
                    onChange={handleChange}
                    value={search}
                />
                <div className="columns">
                    <div className="column">
                        <label className="radio">
                            <input className="mr-2" type="radio" name="category" onChange={handleChange} value={"Is feeling"} />
                            Is feeling
                        </label>
                    </div>
                    <div className="column"><label className="radio">
                        <input className="mr-2" type="radio" onChange={handleChange}
                            name="category"
                            value={"Need help with"} />
                        Need help with
                    </label>
                    </div>
                    <div className="column">
                        <label className="radio">
                            <input className="mr-2" type="radio" name="category" onChange={handleChange} value={"Is developing"} />
                            Is developing
                        </label>
                    </div>
                    <div className="column">
                        <label className="radio">
                            <input className="mr-2" type="radio" name="category" onChange={handleChange} value={"Is learning"} />
                            Is learning
                        </label>
                    </div>
                    <div className="column">
                        <label className="radio">
                            <input className="mr-2" type="radio" name="category" onChange={handleChange} value={"Is attending"} />
                            Is attending
                        </label>
                    </div>
                </div>
                {filteredLength === 0 && <div className="account  has-text-centered ">
                    <p className="text is-black ">Cannot find your post ?</p>
                    <a href="/create"><button className="button  mb-3">Create new Post</button></a>

                </div>}

            </div>
            <div className="columns is-multiline is-centered mb-6">
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