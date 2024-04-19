import { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { format } from 'date-fns';
import { baseUrl } from "../config";

export default function Post() {

    const navigate = useNavigate()
    const currentDate = format(new Date(), 'dd/MM/yyyy | kk:mm')
    
    const [formData, setFormData] = useState({

        title: "",
        content: "",
        code: "",
        category: "",
        image: "",
        post_date: currentDate
    }
    )

    const [errorData, setErrorData] = useState("")

    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
        setErrorData("")
    }

    async function handleSubmit(e: SyntheticEvent) {
        try {
            e.preventDefault()

            const token = localStorage.getItem('token')
            const resp = await axios.post(`${baseUrl}/posts`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const newFormData = structuredClone(formData)
            if (resp.data.message) {
                throw new Error(resp.data.message);
            }
            navigate('/stream')
        } catch (e: any) {
            setErrorData(e.message)
        }
    }


    return <> 
    
    
    
    
    <div className="section">
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Title <span className="has-text-danger">*</span></label>
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
                    <label className="label">Content <span className="has-text-danger">*</span></label>
                    <div className="control">
                        <input
                            className="input border-is-rouge textarea"
                            placeholder="Content"
                            type="text"
                            name={'content'}
                            onChange={handleChange}
                            value={formData.content}
                        />
                    </div>
                </div>
                <div className="field mt-4">
                    <label className="label">Code <span className="has-text-danger">*</span></label>
                    <div className="control">
                        <textarea
                            className="input border-is-rouge textarea"
                            placeholder="Code"
                            name={'code'}
                            onChange={handleChange}
                            value={formData.code}
                            
                        />
                    </div>
                </div>
                <div className="field mt-4">
                    <label className="label">Category <span className="has-text-danger">*</span></label>
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="Category"
                            type="text"
                            name={'category'}
                            onChange={handleChange}
                            value={formData.category}
                        />
                        {errorData && <small className="has-text-danger">{errorData}</small>}

                    </div>
                </div>
                <div className="field  mt-4">
                    <label className="label">image <span className="has-text-danger">*</span></label>
                    <div className="control">
                        <input
                            className="input border-is-rouge"
                            placeholder="http image link"
                            type="text"
                            name={'image'}
                            onChange={handleChange}
                            value={formData.image}
                        />
                    </div>
                </div>
                <button className="mt-4 button border-is-rouge">Submit</button>
            </form>
        </div>

    </div>
        <Footer /></>
}