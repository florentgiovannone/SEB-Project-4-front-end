import React, { SyntheticEvent, useEffect, useState, Component } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { IPost } from "../interfaces/post"
import { IUser } from "../interfaces/user"
import axios from "axios"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { baseUrl } from "../config";
import { isPast } from "date-fns"


function PostCardFull({ title, content, code, image, user, id, category, categoryContent, post_date, like, comment }: IPost) {
  const [post, updateposts] = React.useState<IPost | null>(null);
  const [currentUser, updateCurrentUser] = useState<IUser | null>(null);
  const { postId } = useParams()
  const navigate = useNavigate()
  let liked = ""
console.log();

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
      const resp = await axios.delete(`${baseUrl}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      location.reload()
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
  
  const [formData, setFormData] = useState({
    content: ""
  })
  const [errorData, setErrorData] = useState("")
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return <> <section className="section m-3 p-0 is-centered" >

    <div className="card has-background-black has-text-green" style={{ width: 370 }}>

      <div className="columns pt-2 pb-5 ">
          <div className="media-left ml-6 ">
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
            <p className="has-text-white is-4">{`Posted the ${post_date}`}</p>
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
    <Link to={`/posts/${id}`}>
        <p className="has-background-white has-text-grey pt-2 pl-4 is-4">{`${like.length} Likes | ${comment.length} Comments`}</p>
      </Link>
      <div className="card-content has-background-white pl-4 py-0">
            <div className="block title">
              {title}
            </div>
            <div className="block subtitle">
              {post?.content && `${content}`}
            </div>
            
          <br />           <div className="block">
            {post?.code &&
              <SyntaxHighlighter style={prism} showLineNumbers>{code}</SyntaxHighlighter>
            }
          </div>
        </div>
    </div>
  </section>
  </>
}
export default PostCardFull