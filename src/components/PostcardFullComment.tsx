import React, { SyntheticEvent, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IPost } from "../interfaces/post"
import { IUser } from "../interfaces/user"
import axios from "axios"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from "date-fns"
import { baseUrl } from "../config";

function PostCardFullComment({ title, content, code, image, user, id, category, categoryContent, like, post_date, comment }: IPost) {
  const [post, updateposts] = React.useState<IPost | null>(null)
  const [currentUser, updateCurrentUser] = useState<IUser | null>(null);
  const { postId } = useParams()
  const navigate = useNavigate()
  let liked = ""

  React.useEffect(() => {
    async function fetchposts() {
      const resp = await fetch(`${baseUrl}/posts/${id}`)
      const postsData = await resp.json()
      updateposts(postsData)
    }
    fetchposts()
  }, [])

  async function fetchUser() {
    const token = localStorage.getItem('token')
    const resp = await axios.get(`${baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    updateCurrentUser(resp.data)
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
  }, [])

  async function deletePost(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.delete(`${baseUrl}/posts/${post?.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/stream')
    } catch (error) {
    }
  }

  function checkIfLiked() {
    like.filter(like => {
      if (like.user.id === currentUser?.id) {
        liked = "liked"
      }
    })
  }
  checkIfLiked()
  async function handleLike(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.post(`${baseUrl}/posts/${id}/likes`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (resp.data.message) {
        throw new Error(resp.data.message);
      }
      location.reload()
    } catch (e: any) {
      setErrorData(e.message)
    }

  }
  async function handleDislike(e: SyntheticEvent) {
    try {
      like.filter(async like => {
        if (like.user.id === currentUser?.id) {
          const token = localStorage.getItem('token')
          const resp = await axios.delete(`${baseUrl}/likes/${like.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        }
        location.reload()
      })

    } catch (error) {
    }
  }
  const currentDate = format(new Date(), 'dd/MM/yyyy | kk:mm')
  const [formData, setFormData] = useState({
    content: "",
    code:"",
    comment_date: currentDate
  })
  console.log(currentDate);
  
  const [errorData, setErrorData] = useState("")

  function handleChange(e: any) {
    const fieldName = e.target.name
    const newFormData = structuredClone(formData)
    newFormData[fieldName as keyof typeof formData] = e.target.value
    setFormData(newFormData)
    setErrorData("")
  }

  async function commentPost(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.post(`${baseUrl}/posts/${id}/comments`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const newFormData = structuredClone(formData)
      if (resp.data.message) {
        throw new Error(resp.data.message);
      }
      location.reload()
    } catch (e: any) {
      setErrorData(e.message)
    }
  }

  return <> <section className="section p-2">

        <div className="card has-background-black has-text-green">
          <div className="columns mt-6 mb-6">
            <div className="media-left ml-6">
              <figure className="image is-96x96">
                <img
                  className="is-rounded mt-4 has-border-green"
                  src={user.image}
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="column ">
          <p className="title has-text-green is-4">{`${user.username} ${category} ${categoryContent}`}</p>
          <p className=" is-4 has-text-white">{`Posted the ${post_date}`}</p>

            </div>

          </div>

          {post?.image && <div className="card-image">
            <figure className="image is-square">
              <img
                src={image}
                alt="Placeholder image"
              />
            </figure>
          </div>}
        <div className="card-footer has-background-white">
        {currentUser && (liked !== "liked") && <button onClick={handleLike} className="card-footer-item has-text-grey">like</button>}
        {currentUser && (liked === "liked") && <button onClick={handleDislike} className="card-footer-item has-text-grey">dislike</button>}
        {post && currentUser && (currentUser.id === post.user.id) && <button onClick={deletePost} className="card-footer-item has-text-grey">Delete Post</button>}
        {post && currentUser && (currentUser.id === post.user.id) && <a className="card-footer-item has-text-grey" href={`/update/${id}`}><button>Edit Post</button></a>}
        </div>
      <div className="card-content has-background-white">
        <p className=" has-text-grey is-4">{`${like.length} Likes | ${comment.length} Comments`}</p>
            <div className="block title has-background-white">
              {title}
            </div>
        <div className="block subtitle has-background-white">
              {post?.content && `${content}`}
            </div>

            <br />
        <div className="block subtitle has-background-white">
            {post?.code && 
              <SyntaxHighlighter style={prism} showLineNumbers>{code}</SyntaxHighlighter>
            }
            </div>
            
          </div>
      {currentUser && <>
        <footer className="card-footer has-background-white ">

            <div className="column">
              <textarea
              className="textarea p-4 has-border-green"
                name={'content'}
                onChange={handleChange}
                value={formData.content}
                placeholder="Comment ..."></textarea>
            </div>
            <div className="column">
              <textarea
                className="textarea p-4 has-border-green"
                name={'code'}
                onChange={handleChange}
                value={formData.code}
                placeholder="<Code>"></textarea>
            </div>

        </footer>
        <div className="container has-text-centered has-background-white">
            <div className="button  m-4">
          <button onClick={commentPost} className="card-footer-item is-centered ">Comment</button>
            </div>
        </div></>}
            </div>


  </section>
  </>
}
export default PostCardFullComment