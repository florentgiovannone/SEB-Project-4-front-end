import React, { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
// import { baseUrl } from "../config";
export default function updateAvatar({ user }: { user: null | IUser }) {

    const { userId } = useParams()
    const navigate = useNavigate()


    React.useEffect(() => {
        async function fetchUser() {
            const resp = await fetch(`/api/users/${userId}`)
            const usersData = await resp.json()
            setFormData(usersData)
        }
        fetchUser()
    }, [])

    const [formData, setFormData] = useState({
        image: ""
    }
    )

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

        const resp = await axios.put(`/api/users/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp.data)
        navigate(`/dashboard`)
        window.location.reload();
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
                <div className="field  mt-4">
                    <div>
                        <div className="container">
                            <button className="button" onClick={handleUpload}>Click to upload an image</button>
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
                <div>{user && <button onClick={handleSubmit} className="button m-6  border-is-rouge">Update</button>}</div>
        </div>

    </div>
        <Footer /></>
}