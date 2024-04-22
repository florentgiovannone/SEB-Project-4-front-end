import React, { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import { IComment } from "../interfaces/comment"
import { baseUrl } from "../config";


export default function UpdateComment({ user }: { user: null | IUser }, {id }: IComment) {
    const { commentId } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        console.log("The comment Page has mounted")
    }, [])

    const [formData, setFormData] = useState({
        content: ""
    }
    )
    React.useEffect(() => {
        async function fetchPosts() {
            const resp = await fetch(`${baseUrl}/comments/${commentId}`)
            const commentsData = await resp.json()
            setFormData(commentsData)
        }
        fetchPosts()
    }, [])
    console.log(commentId);
    
    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const newFormData = structuredClone(formData)

        const resp = await axios.put(`${baseUrl}/comments/${commentId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp.data)
        navigate(`/stream`)
    }
    console.log(commentId)


    return <> <div className="section">
        <div className="container">
            <form >
                <div className="field mt-4">
                    <div className="control">
                        <textarea
                            className="input has-border-green "
                            placeholder="Content"
                            name={'content'}
                            onChange={handleChange}
                            value={formData.content}
                        />
                    </div>
                </div>
                <div>{user && <button onClick={handleSubmit} className="button m-6  has-border-green ">Update</button>}</div>
            </form>
        </div>

    </div>
        <Footer /></>
}