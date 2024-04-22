import React, { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import { baseUrl } from "../config";

declare global {
    interface Window { cloudinary: any; }
}
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
            const resp = await fetch(`${baseUrl}/posts/${postId}`)
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

        const resp = await axios.put(`${baseUrl}/posts/${postId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp.data)
        navigate(`/posts/${postId}`)
    }
    console.log(formData)
    function handleUpload() {
        window.cloudinary
            .createUploadWidget(
                {
                    cloudName: "ded4jhx7i", //!this will be your cloud name - this should be in your .env
                    uploadPreset: "Codestream", //!this will be your upload presets - this should be in your .env
                    cropping: true,
                    croppingAspectRatio: 1
                },
                (err: any, result: { event: string; info: { secure_url: any; }; }) => {
                    if (result.event !== "success") {
                        return;
                    }
                    console.log(result);

                    setFormData({
                        ...formData,
                        image: result.info.secure_url,
                    });
                }
            )
            .open();
    }

      
    return <> <div className="section">
        <div className="container">

                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            className="input has-border-green "
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
                            className="input has-border-green "
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
                            className="input has-border-green "
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
                            className="input has-border-green "
                            placeholder="Category"
                            type="text"
                            name={'category'}
                            onChange={handleChange}
                            value={formData.category}
                        />
                    </div>
                </div>
                <div className="field  mt-4">
                    <div>
                        <div className="container">
                            <button className="button mb-3" onClick={handleUpload}>Click to upload an image</button>
                            <textarea
                                className="textarea is-primary"
                                placeholder='Image URL'
                                onChange={handleChange}
                                name={'image'}
                                value={formData.image} />
                        </div>

                        <div>
                        </div>

                    </div>
                </div>
            
                <div>{user && <button onClick={handleSubmit} className="button mt-3  has-border-green ">Update</button>}</div>
        </div>

    </div>
        <Footer /></>
}