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

    

    const [search, setSearch] = React.useState("");

    function handleChange(e: any) {
        setSearch(e.currentTarget.value);
    }

    function filterPosts() {
        return posts?.filter((post: { category: string, title: string, content: string, categoryContent: string}) => {
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
        <section className="section p-0" >
            <div className="columns is-centered ">
                <div className="container m-0 p-0">
            <Post  />
                <input
                    className="input has-border-green background-is-rouge is-rounded mb-6 "
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
                    <div className="columns is-multiline is-centered mb-6">
                        {filterPosts()?.map((post) => {
                            return <PostCardFull key={post.id} {...post} />;
                        })}
                    </div>

                
                </div>
            </div>
    </section>

        <Footer />
    </>)
}
export default postList