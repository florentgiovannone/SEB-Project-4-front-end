import React from "react"
import Footer from "./Footer"
import { IUser } from "../interfaces/user";

interface NavbarProps {
    user: null | IUser,
    setUser: Function
}

function Home({ user, setUser }: NavbarProps) {
    React.useEffect(() => {
        console.log("The Home Page is ready!")
    }, [])

    return (<>
        <section className="hero is-fullheight" style={{ position: "relative" }}>
            <div className="content m-6 has-text-centered">
                <h1>Join the CodeStream Community Today</h1>
                <p>Whether you're looking to expand your professional network, collaborate on exciting projects, or simply stay informed about the latest developments in the world of software engineering, CodeStream has everything you need. </p>
                <p>Join our growing community of passionate engineers and take your career to new heights. Sign up today and experience the power of connection with CodeStream.</p>
            </div>
            <Footer />
        </section>
    </>
    );
}
export default Home