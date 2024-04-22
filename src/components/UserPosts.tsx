import React from "react"
import PostCardFull from "./PostcardFull"
import { IPost } from "../interfaces/post"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import { useParams } from "react-router-dom"
import { baseUrl } from "../config";

type Posts = null | Array<IPost>
function UserPosts() {
    const [posts, setPosts] = React.useState<Posts>(null)

    const { userId } = useParams()
    
    const [neededUser, setUser] = React.useState<IUser | null>(null)
    React.useEffect(() => {
console.log("user ID", userId);

        async function fetchUser() {
            const resp = await fetch(`${baseUrl}/users/${userId}`)
            console.log(resp);
            const userData = await resp.json()
            setUser(userData)
        }
        fetchUser()
    }, [])
    console.log(neededUser?.email);


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
            <h1 className="title has-text-centered mt-6">{`${neededUser?.username}'s stream `}</h1>

                <div className="columns has-text-centered is-centered is-multiline mt-5">
                </div>
                <input
                    className="input has-border-green is-rounded mb-6"
                    placeholder="Search character..."
                    onChange={handleChange}
                    value={search}
                />
                <div className="columns mb-4">
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
            </div>
            <div className="columns is-multiline is-centered mb-6">
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