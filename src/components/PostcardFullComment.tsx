import React, { SyntheticEvent, useEffect, useState, Component } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { IPost } from "../interfaces/post"
import { IUser } from "../interfaces/user"
import axios from "axios"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

function PostCardFullComment({ title, content, code, image, user, id, category, like, comment }: IPost) {
  const [post, updateposts] = React.useState<IPost | null>(null)
  const [currentUser, updateCurrentUser] = useState<IUser | null>(null);
  const { postId } = useParams()
  const navigate = useNavigate()
  let liked = ""

  React.useEffect(() => {
    async function fetchposts() {
      const resp = await fetch(`/api/posts/${id}`)
      const postsData = await resp.json()
      updateposts(postsData)
    }
    fetchposts()
  }, [])

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

  async function deletePost(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.delete(`/api/posts/${post?.id}`, {
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
      const resp = await axios.post(`/api/posts/${id}/likes`, formData, {
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
          const resp = await axios.delete(`/api/likes/${like.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        }
        location.reload()
      })

    } catch (error) {
    }
  }

  const [formData, setFormData] = useState({
    content: ""
  })
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
      const resp = await axios.post(`/api/posts/${id}/comments`, formData, {
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

  return <> <section className="section">

        <div className="card">
          <div className="columns mt-6 mb-6">
            <div className="media-left ml-6">
              <figure className="image is-96x96">
                <img
                  className="is-rounded"
                  src={user.image}
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="column ">
              <p className="title is-4">{`${user.username} is feeling ${category}`}</p>
            <p className=" is-4">{`${like.length} Likes | ${comment.length} Comments`}</p>
              {/* <p className="subtitle is-6">{`${user.firstname}`}</p>
            <p className="subtitle is-6">{`${user.lastname}`}</p> */}
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
        <div className="card-footer">
          {(liked !== "liked") && <button onClick={handleLike} className="card-footer-item">like</button>}
          {(liked === "liked") && <button onClick={handleDislike} className="card-footer-item">dislike</button>}
          {post && currentUser && (currentUser.id === post.user.id) && <button onClick={deletePost} className="card-footer-item">Delete Post</button>}
          {post && currentUser && (currentUser.id === post.user.id) && <a className="card-footer-item" href={`/update/${id}`}><button>Edit Post</button></a>}
        </div>
          <div className="card-content ml-3">
            <div className="block title">
              {title}
            </div>
            <div className="block subtitle">
              {post?.content && `${content}`}
            </div>

            <br />
            <div className="block">
            {post?.code && 
              <SyntaxHighlighter style={prism} showLineNumbers>{code}</SyntaxHighlighter>
            }
            </div>
            
          </div>

        </div>
          {currentUser && <>
          <footer className="card-footer">
              <textarea 
                className="textarea p-4"
                name={'content'}
                onChange={handleChange}
                value={formData.content} 
                placeholder="write your comment here"></textarea>
          </footer>
            <div className="button has-text-centered mt-4">
          <button onClick={commentPost} className="card-footer-item is-centered ">Comment</button>
            </div></>}


  </section>
  </>
}
export default PostCardFullComment