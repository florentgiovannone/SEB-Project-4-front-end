import { SyntheticEvent, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
// import { baseUrl } from "../config";
import React from "react";


export default function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    image: "",
    password: "",
    password_confirmation: ""
  })

  const [errorData, setErrorData] = useState(" "
  )


  function handleChange(e: any) {
    const fieldName = e.target.name
    const newFormData = structuredClone(formData)
    newFormData[fieldName as keyof typeof formData] = e.target.value
    setFormData(newFormData)

  }
  console.log(formData);
  

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault()
      const resp = await axios.post(`/api/signup`, formData)
      console.log(resp.data)
      navigate('/login')
    } catch (e: any) {
      setErrorData(e.response.data.error)
    }
  }
  console.log(errorData)

  return <><div className="section">
    
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field  mt-4">
          <label className="label">Username <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input border-is-rouge"
              placeholder="Username"
              type="text"
              name={'username'}
              onChange={handleChange}
              value={formData.username}
            />
            {/* {errorData.username && <small className="has-text-danger">{errorData.username}</small>} */}
          </div>
        </div>
        <div className="field  mt-4">
          <label className="label">Firstname <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input border-is-rouge"
              placeholder="Firstname"
              type="text"
              name={'firstname'}
              onChange={handleChange}
              value={formData.firstname}
            />
            {/* {errorData.firstname && <small className="has-text-danger">{errorData.firstname}</small>} */}
          </div>
        </div>
        <div className="field  mt-4">
          <label className="label">Lastname <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input border-is-rouge"
              placeholder="Lastname"
              type="text"
              name={'lastname'}
              onChange={handleChange}
              value={formData.lastname}
            />
            {/* {errorData.lastname && <small className="has-text-danger">{errorData.lastname}</small>} */}
          </div>
        </div>
        <div className="field  mt-4">
          <label className="label">Email <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input border-is-rouge"
              placeholder="Email"
              type="text"
              name={'email'}
              onChange={handleChange}
              value={formData.email}
            />
            {/* {errorData.email && <small className="has-text-danger">{errorData.email}</small>} */}
          </div>
        </div>
        <div className="field  mt-4">
          <label className="label">Avatar <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input border-is-rouge"
              placeholder="http image link"
              type="text"
              name={'image'}
              onChange={handleChange}
              value={formData.image}
            />
            {/* {errorData.email && <small className="has-text-danger">{errorData.email}</small>} */}
          </div>
        </div>
        <div className="field  mt-4">
          <label className="label">Password <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input border-is-rouge"
              placeholder="Password"
              type="password"
              name={'password'}
              onChange={handleChange}
              value={formData.password}
            />
            {/* {errorData.password && <small className="has-text-danger">{errorData.password}</small>} */}
          </div>
        </div>
        <div className="field  mt-4">
          <label className="label">Confirm password <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input border-is-rouge"
              placeholder="Confirm password"
              type="password"
              name={'password_confirmation'}
              onChange={handleChange}
              value={formData.password_confirmation}
            />
            <small className="has-text-danger">{errorData}</small>
          </div>
        </div>
        <button className="button border-is-rouge  mt-4">Submit</button>
      </form>
    </div>
  </div>
    <Footer />
  </>
}
