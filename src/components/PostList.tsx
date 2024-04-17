import React from "react"
import PostCardFull from "./PostcardFull"
import { IPost } from "../interfaces/post"
import Footer from "./Footer"
// import { baseUrl } from "../config";

type Posts = null | Array<IPost>
function postList() {
    const [posts, setPosts] = React.useState<Posts>(null)
    React.useEffect(() => {
        async function fetchPosts() {
            const resp = await fetch(`/api/posts`)
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
        return posts?.filter((post: { title: string }) => {
            const lowerSearch = search.toLowerCase();
            const lowerPostName = post.title.toLowerCase();

            return lowerPostName.includes(lowerSearch);
        });
    }
    const filteredLength: any = filterPosts()?.length

    return (<>
    <section className="container">

                <input
                    className="input background-is-rouge is-rounded mt-6"
                    placeholder="Search character..."
                    onChange={handleChange}
                    value={search}
                />
                {filteredLength === 0 && <div className="account  has-text-centered background-is-grey mt-5">
                    <p className="text is-black ">Cannot find your post ?</p>
                    <a href="/create"><button className="button  mb-3">Create new Post</button></a>

                </div>}

                <div className="container">
                    {filterPosts()?.map((post) => {
                        return <PostCardFull
                                key={post.id}
                                {...post}
                            />
                    })}
                </div>


    </section>

        <Footer />
    </>)
}
export default postList