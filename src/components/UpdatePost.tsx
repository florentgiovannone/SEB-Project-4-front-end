import React, { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
// import { baseUrl } from "../config";


export default function UpdatePost({ user }: { user: null | IUser }) {
    const { postId } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        console.log("The post Page has mounted")
    }, [])

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        code: "",
        category: "",
        image: ""
    }
    )
    React.useEffect(() => {
        async function fetchPosts() {
            const resp = await fetch(`/api/posts/${postId}`)
            const postsData = await resp.json()
            setFormData(postsData)
        }
        fetchPosts()
    }, [])
    console.log(postId);
    
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

        const resp = await axios.put(`/api/posts/${postId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp.data)
        navigate(`/posts/${postId}`)
    }
    console.log(formData)


    return <> <div className="section">
        <div className="container">
            <form >
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Title"
                            type="text"
                            name={'title'}
                            onChange={handleChange}
                            value={formData.title}
                        />
                    </div>
                </div>
                <div className="field mt-4">
                    <label className="label">Content</label>
                    <div className="control">
                        <textarea
                            className="input border-is-rouge"
                            placeholder="Content"
                            name={'content'}
                            onChange={handleChange}
                            value={formData.content}
                        />
                    </div>
                </div>
                <div className="field mt-4">
                    <label className="label">Code</label>
                    <div className="control">
                        <textarea
                            className="input border-is-rouge"
                            placeholder="Code"
                            name={'code'}
                            onChange={handleChange}
                            value={formData.code}
                        />
                    </div>
                </div>
                <div className="field mt-4">
                    <label className="label">Category</label>
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Category"
                            type="text"
                            name={'category'}
                            onChange={handleChange}
                            value={formData.category}
                        />
                    </div>
                </div>
                <div className="field mt-4">
                    <label className="label">Image</label>
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Image"
                            type="text"
                            name={'image'}
                            onChange={handleChange}
                            value={formData.image}
                        />
                    </div>
                </div>
            
                <div>{user && <button onClick={handleSubmit} className="button m-6  border-is-rouge">Update</button>}</div>
            </form>
        </div>

    </div>
        <Footer /></>
}