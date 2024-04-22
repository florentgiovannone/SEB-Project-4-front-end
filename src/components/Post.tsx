import { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns';
import { baseUrl } from "../config";

export default function Post() {

    const navigate = useNavigate()
    const currentDate = format(new Date(), 'dd/MM/yyyy | kk:mm')
    const [button, updateButton] = useState(false)
    const [formData, setFormData] = useState({

        title: "",
        content: "",
        code: "",
        category: "",
        categoryContent: "",
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
            if (resp.data.message) {
                throw new Error(resp.data.message);
            }
            location.reload()
        } catch (e: any) {
            setErrorData(e.message)
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleOpenModal() {
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
    }
    console.log(isModalOpen);


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

    return <> <section className="section p-0">
<div className="columns is-centered">
  <div className="column is-half has-text-centered mt-4">
        <button className="button is-outlined is-danger m-4 " onClick={handleOpenModal}>
            POST!!
        </button>
            </div>
        </div>
        {isModalOpen && (<div className="modal is-active">
            <div className="modal-background" ></div>
            <div className="modal-content" style={{ width: 1200 }}>
                <div className="container is-fullwidth" >
                        <div className="columns">

                            <div className="column">

                                <div className="field ">
                                    <p className="control has-icons-left has-icons-right">
                                    <input className="input has-border-green "
                                            placeholder="Title"
                                            type="text"
                                            name={'title'}
                                            onChange={handleChange}
                                            value={formData.title} 
                                            style={{height:105}}/>
                                    </p>
                                </div>
                                <div className="field mt-5">
                                    <p className="control has-icons-left">
                                        <textarea className="input has-border-green  " style={{ height: 150 }}
                                            placeholder="Content"
                                            name={'content'}
                                            onChange={handleChange}
                                            value={formData.content} />
                                    </p>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field ">
                                    <p className="control has-icons-left has-icons-right">
                                    <select className="input has-border-green mb-5" placeholder="Category"
                                            name={'category'}
                                            onChange={handleChange}
                                            value={formData.category} >
                                        <option value="" disabled selected>- Choose from the below -</option>
                                        <option value="is feeling">Is feling ...</option>
                                        <option value="need help with">Need help with ... </option>
                                        <option value="is developing">Is developing ...</option>
                                        <option value="is learning">Is learning.... </option>
                                        <option value="is attending">Is attending ....</option>
                                            </select>
                                            
                                    </p>
                                </div>
                                <div className="field ">
                                    <p className="control has-icons-left has-icons-right">
                                    <input className="input has-border-green "
                                        placeholder="Category content"
                                        type="text"
                                        name={'categoryContent'}
                                        onChange={handleChange}
                                        value={formData.categoryContent} />
                                    </p>
                                </div>
                                <div className="field mt-5">
                                    <p className="control has-icons-left">
                                    <textarea className="input has-border-green" style={{ height: 150 }} placeholder="<Code>"
                                            name={'code'}
                                            onChange={handleChange}
                                            value={formData.code} />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="field  mt-4">
                            <div>
                                    <div className="container">
                                        <button className="button mb-3" onClick={handleUpload}>Click to upload an image</button>
                                        <textarea
                                    className="textarea is-primary has-border-green"
                                            placeholder='Image URL'
                                            onChange={handleChange}
                                            name={'image'}
                                            value={formData.image} />
                                    </div>
                                    
                                    <div>
                                    </div>
                                
                            </div>
                        </div>
                        <button className="my-4 button border-is-rouge" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <button className="modal-close has-text-green" onClick={handleCloseModal} aria-label="close">X</button>
        </div>)}
    </section></>
}