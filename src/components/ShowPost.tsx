import React, { SyntheticEvent, useEffect, useState, Component } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IPost } from "../interfaces/post"
import PostCardComment from "./Comment"
import axios from "axios"
import { IUser } from "../interfaces/user"
import { IComment } from "../interfaces/comment"
import Footer from "./Footer"
import PostCardFull from "./PostcardFullComment"
// import { baseUrl } from "../config";

type Comment = null | Array<IComment>

function ShowPost(this: any, { user }: { user: null | IUser }) {

    const [post, updatePost] = React.useState<IPost | null>(null)
    const [comment, setComment] = React.useState<Comment | null>(null)
    const { postId } = useParams()

    React.useEffect(() => {
        async function fetchPost() {
            const resp = await fetch(`/api/posts/${postId}`)
            const postData = await resp.json()
            setComment(postData.comment)            
        }
        fetchPost()
    }, [])

    React.useEffect(() => {
        async function fetchPost() {
            const resp = await fetch(`/api/posts/${postId}`)
            const postData = await resp.json()
            updatePost(postData)
        }
        fetchPost()
    }, [])

    const [text, setText] = useState("")

    class Parent extends React.Component {
        state = { isModalOpen: false };

        render() {
            return (<div>
                {this.state.isModalOpen &&
                    <Component onClose={() => this.setState({ isModalOpen: false })
                    } />
                }
            </div>);
        }
    }
    
    return <> <section className="section">
        <div className="container has-text-centered is-widescreen">

            {post && <PostCardFull
                key={post.id}
                {...post}
            />}
            {comment?.map((comment: { id: any, user: any }) => {
                return <PostCardComment
                    content={""} key={comment.id}
                    {...comment}                />
            })} 
            <div>{text && (
                <div className="notification is-grey background-is-rouge" >
                    <button className="delete" onClick={() => { setText(''); window.location.reload(); }} ></button>
                    {text}
                </div>)}
            </div>
        </div>


    </section>
        <Footer /> </>
}

export default ShowPost
