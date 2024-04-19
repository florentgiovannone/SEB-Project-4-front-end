import React, { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "./Footer"
import { IUser } from "../interfaces/user"
import { baseUrl } from "../config";

export default function updateAccount({ user }: { user: null | IUser }) {

    const { userId } = useParams()
    const navigate = useNavigate()


    React.useEffect(() => {
        async function fetchUser() {
            const resp = await fetch(`${baseUrl}/users/${userId}`)
            const usersData = await resp.json()
            setFormData(usersData)
        }
        fetchUser()
    }, [])

    const [formData, setFormData] = useState({
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        passwordConfirmation: ""
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

        const resp = await axios.put(`${baseUrl}/users/${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(resp.data)
        navigate(`/dashboard`)
        window.location.reload();
    }
    console.log(formData)


    return <> <div className="section">
        <div className="container">
            <form >
                <div className="field  mt-4">
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Username"
                            type="text"
                            name={'username'}
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>
                </div>
                <div className="field  mt-4">
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Firstname"
                            type="text"
                            name={'firstname'}
                            onChange={handleChange}
                            value={formData.firstname}
                        />
                    </div>
                </div>
                <div className="field  mt-4">
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Lastname"
                            type="text"
                            name={'lastname'}
                            onChange={handleChange}
                            value={formData.lastname}
                        />
                    </div>
                </div>
                <div className="field  mt-4">
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Email"
                            type="text"
                            name={'email'}
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                </div>
                <div>{user && <button onClick={handleSubmit} className="button m-6  border-is-rouge">Update</button>}</div>
            </form>
        </div>

    </div>
        <Footer /></>
}