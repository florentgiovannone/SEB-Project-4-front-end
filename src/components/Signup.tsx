import { SyntheticEvent, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
// import { baseUrl } from "../config";
import React from "react";
import { IUser } from "../interfaces/user";

type User = null | Array<IUser>
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

  const [usernameError, setUsernameError] = React.useState<User>(null)

  React.useEffect(() => {
    async function fetchPosts() {
      const resp = await fetch(`/api/all_users`)
      const data = await resp.json()
      setUsernameError(data)
    }
    fetchPosts()
  }, [])
  console.log(usernameError);
  
  const [usernameUpdate, setUsernameUpdate] = React.useState("");
  const [green, setGreen] = React.useState(false);
  const [greenPassUpper, setGreenPassUpper] = React.useState(false);
  const [greenPassLower, setGreenPassLower] = React.useState(false);
  const [greenPassSpec, setGreenPassSpec] = React.useState(false);
  const [greenPassNum, setGreenPassNum] = React.useState(false);
  const [greenPassLength, setGreenPassLength] = React.useState(false);

  function filterUser(newFormData: { email: string; firstname: string; lastname: string; username: string; image: string; password: string; password_confirmation: string; }) {
    if (!usernameError) {
      return;
    }
    const foundUser = usernameError.find((user) => user.username === newFormData.username);
    if (foundUser) {
      setUsernameUpdate("The username already exists");
      setGreen(false)
    } else {
      setUsernameUpdate("You can use this username");
      setGreen(true)
    }
      const spec_chart = ["!", "@", "#", "$", "%", "&", "*"]
      const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
      const hasUppercase = newFormData.password.split('').some(char => char.toUpperCase() === char && char.toLowerCase() !== char);
      const hasLowercase = newFormData.password.split('').some(char => char.toUpperCase() !== char && char.toLowerCase() === char);
      const hasSpecial = newFormData.password.split('').some(char => spec_chart.includes(char))
      const hasnumber = newFormData.password.split('').some(char => numbers.includes(char))

    if (hasUppercase){
      setGreenPassUpper(true)
    }
    else{
      setGreenPassUpper(false)
    }
    if (hasLowercase) {
      setGreenPassLower(true)
    }
    else {
      setGreenPassLower(false)
    }
    if (hasSpecial) {
      setGreenPassSpec(true)
    }
    else {
      setGreenPassSpec(false)
    }
    if (hasnumber) {
      setGreenPassNum(true)
    }
    else {
      setGreenPassNum(false)
    }
    if (newFormData.password.length <= 20 && newFormData.password.length >= 8) {
      setGreenPassLength(true)
    }
    else {
      setGreenPassLength(false)
    }
  }
  
  function handleChange(e: any) {

    const fieldName = e.target.name
    const newFormData = structuredClone(formData)
    newFormData[fieldName as keyof typeof formData] = e.target.value
    filterUser(newFormData)
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
  return <><div className="section">
    
    <div className="container">
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
            {green && <small className="has-text-success">{usernameUpdate}</small>}
            {!green && <small className="has-text-danger">{usernameUpdate}</small>}
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
            <div className="content is-small">
              <p>Password need to have the below requirements:            </p>
              <ul>
                {greenPassUpper && <li className="has-text-success">one uppercase</li>}
                {!greenPassUpper && <li className="has-text-danger"> X one uppercase</li>}
                {greenPassLower && <li className="has-text-success">one lowerCase</li>}
                {!greenPassLower && <li className="has-text-danger"> X one lowerCase</li>}
                {greenPassSpec && <li className="has-text-success">one special character</li>}
                {!greenPassSpec && <li className="has-text-danger"> X one special character</li>}
                {greenPassNum && <li className="has-text-success">one digit</li>}
                {!greenPassNum && <li className="has-text-danger"> X one digit</li>}
                {greenPassLength && <li className="has-text-success">Be between 8 and 20 character long</li>}
                {!greenPassLength && <li className="has-text-danger"> X Be between 8 and 20 character long</li>}
              </ul>

            </div>
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
            <h2 className="has-text-danger">{errorData}</h2>
          </div>
        </div>
        <button className="button border-is-rouge  mt-4" onClick={handleSubmit}>Submit</button>
    </div>
  </div>
    <Footer />
  </>
}
