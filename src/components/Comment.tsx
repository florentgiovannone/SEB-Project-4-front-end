import React, { SyntheticEvent, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IPost } from "../interfaces/post"
import { IUser } from "../interfaces/user"
import { IComment } from "../interfaces/comment"
import axios from "axios"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { baseUrl } from "../config"

function Comment({ content, code, user, id, comment_date }: IComment) {
  const [post, updateposts] = React.useState<IPost | null>(null)
  const [formData, setFormData] = useState("")

  const [currentUser, updateCurrentUser] = useState<IUser | null>(null);
  const { postId } = useParams()
  const navigate = useNavigate()



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
      const resp = await axios.delete(`${baseUrl}/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/stream')
    } catch (error) {
    }
  }




  return <> <section className="section p-2">
    <div className="box m-0 p-0">
      <div className="media has-background-black">
        <div className="media-left ">
          <figure className="image is-64x64 m-4">
            <img src={user.image} className="is-rounded has-border-green"/>
          </figure>
        </div>
        <div className="media-content has-text-green">
          <div className="content m-4 has-text-green">
            <p className="has-text-green m-0">{user.username}</p> 
            <p className="has-text-white">{`   Posted the ${comment_date}`}</p>
            <div className="block subtitle has-text-white ">
                {content && `${content}`}
              </div>
              <br />
              <div className="block">
                {code &&
                  <SyntaxHighlighter style={prism} showLineNumbers>{code}</SyntaxHighlighter>
                }
              </div>
          </div>
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

        </div>
      </div>
      <footer className="card-footer">
        {user && currentUser && (currentUser.id === user.id) && <button onClick={deletePost} className="card-footer-item has-text-grey my-4">Delete Comment</button>}
        {user && currentUser && (currentUser.id === user.id) && <a className="card-footer-item has-text-grey" href={`/updateComment/${id}`}><button>Edit Comment</button></a>}
      </footer>
    </div>
  </section>
  </>
}
export default Comment