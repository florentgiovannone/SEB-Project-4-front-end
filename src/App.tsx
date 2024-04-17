import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Home from './components/Home'
import Navbar from "./components/Navbar"
import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"
import Mystream from "./components/Mystream";
import Signup from "./components/Signup"
import Login from "./components/Login"
import Post from "./components/Post"
import PostList from "./components/PostList"
import UserList from "./components/UserList"
import UpdateAccount from "./components/UpdateAccount";
import Dashboard from "./components/Dashboard"
import UserDashboard from "./components/UserDashboard"
import UserPosts from "./components/UserPosts"
import ShowPost from "./components/ShowPost"
// import { baseUrl } from "./config";

function App() {

  const [user, setUser] = useState(null)


  async function fetchUser() {
    const token = localStorage.getItem('token')
    const resp = await axios.get(`/api/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setUser(resp.data)
  }
  console.log(user);
  

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchUser()
  }, [])

  const [post, setPost] = useState(null)


  async function fetchPosts() {
    const token = localStorage.getItem('token')
    const resp = await axios.get(`/api/posts`)
    setPost(resp.data)
  }

return (
  <Router>
    <Navbar user={user} setUser={setUser} />
    <Routes>
      <Route path="/" element={<Home user={user} setUser={setUser} />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/stream" element={<PostList />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login fetchUser={fetchUser} />} />
      <Route path="/mystream" element={<Mystream />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/updateaccount/:userId" element={<UpdateAccount user={user} />} />
      <Route path="/dashboard" element={<Dashboard user={user} />} />
      <Route path="/post" element={<Post />} />
      <Route path="/account/:userId" element={<UserDashboard />} />
      <Route path="/post/:userId" element={<UserPosts />} />
      <Route path="/posts/:postId" element={<ShowPost user={user} />} />
    </Routes>
  </Router>
)
}

export default App
