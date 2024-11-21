import { ChangeEvent, SyntheticEvent, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { baseUrl } from "../config";

export default function Login({ fetchUser }: { fetchUser: Function }) {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const resp = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem('token', resp.data.token);
      await fetchUser();
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error || "An unexpected error occured")
      } else {
        console.error("Error during login", error);
        setErrorMessage("An unexpected error occured"); 
      }
    }
  }

  return <> <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field mt-4">
          <label className="label">Username <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input has-border-green "
              placeholder="Username"
              type="text"
              name={'username'}
              onChange={handleChange}
              value={formData.username}
            />
          </div>
        </div>
        <div className="field mt-4">
          <label className="label">Password <span className="has-text-danger">*</span></label>
          <div className="control">
            <input
              className="input has-border-green "
              placeholder="Password"
              type="password"
              name={'password'}
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          {errorMessage && <small className="has-text-danger">{errorMessage}</small>}
        </div>
        <button className="button has-border-green  mt-4">Submit</button>
      </form>
    </div>
  </div>
    <Footer />
  </>
}