import React, { SyntheticEvent, useEffect, useState, Component } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { IPost } from "../interfaces/post"
import { IUser } from "../interfaces/user"
import { IComment } from "../interfaces/comment"
import axios from "axios"


function Comment({ content, user, id}: IComment) {
  const [post, updateposts] = React.useState<IPost | null>(null)
  const [formData, setFormData] = useState("")

  const [currentUser, updateCurrentUser] = useState<IUser | null>(null);
  const { postId } = useParams()
  const navigate = useNavigate()



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
      const resp = await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/posts')
    } catch (error) {
    }
  }




  return <> <section className="section">
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={user.image} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{user.username}</strong> <small>{`${user.firstname}, ${user.lastname}`}</small>
              <br />{content}
            </p>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item" aria-label="reply">
                <span className="icon is-small">
                  <i className="fas fa-reply" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="retweet">
                <span className="icon is-small">
                  <i className="fas fa-retweet" aria-hidden="true"></i>
                </span>
              </a>
              <a className="level-item" aria-label="like">
                <span className="icon is-small">
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
      <footer className="card-footer">
      {user && currentUser && (currentUser.id === user.id) && <button onClick={deletePost} className="card-footer-item">Delete</button>}
      {user && currentUser && (currentUser.id === user.id) && <a className="card-footer-item" href={`/update/${id}`}><button>Update</button></a>}
      </footer>
    </div>
  </section>
  </>
}
export default Comment