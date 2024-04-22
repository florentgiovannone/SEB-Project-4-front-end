import React from "react"
import UserCard from "./UserCard"
import { IUser } from "../interfaces/user"
import Footer from "./Footer"
import { baseUrl } from "../config"


type User = null | Array<IUser>
function UserList() {
  const [user, setUser] = React.useState<User>(null)

  React.useEffect(() => {
    async function fetchuser() {
      const resp = await fetch(`${baseUrl}/users`)
      const data = await resp.json()
      setUser(data)
    }
    fetchuser()
  }, [])
  console.log(user);
  

  const [search, setSearch] = React.useState("");

  function handleChange(e: any) {
    setSearch(e.currentTarget.value);
  }

  function filterUser() {
    return user?.filter((user: {
      lastname: string,
      username: string, firstname: string 
}) => {
      const lowerSearch = search.toLowerCase();
      const lowerUserame = user.username.toLowerCase();
      const lowerfirstname = user.firstname.toLowerCase();   
      const lowerlastname = user.lastname.toLowerCase();   
      return lowerUserame.includes(lowerSearch) || lowerfirstname.includes(lowerSearch) || lowerlastname.includes(lowerSearch);
    });
  }
  return (<><section className="container m-8">
    <div className="columns is-centered m-6">
      <div className="container">

        <input
          className="input has-border-green  is-rounded mb-3"
          placeholder="Search character..."
          onChange={handleChange}
          value={search}
        />
        <div className="columns is-multiline is-centered mb-6">
          {filterUser()?.map((user) => {
            return <UserCard
              key={user.id}
              {...user}
            />
          })}
        </div>

      </div>
    </div>
    <div className="container mb-6">
      <div className="container mb-6">
        <div className="container mb-6">

        </div>
      </div>
    </div>


  </section>

    <Footer />
  </>)
}
export default UserList