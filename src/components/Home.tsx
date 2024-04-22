import React from "react"
import Footer from "./Footer"
import { IUser } from "../interfaces/user";
import main from "../assets/images/main.png"

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
                <figure className="is-flex is-justify-content-center image pt-6">
                    <img style={{ height: 100, width: 600 }} src={main} />
                </figure>
            <div className="content m-6 has-text-centered has-text-white">
                <h1 className="has-text-green">Join the CodeStream Community Today</h1>
                <p>Whether you're looking to expand your professional network, collaborate on exciting projects, or simply stay informed about the latest developments in the world of software engineering, CodeStream has everything you need. </p>
                <p>Join our growing community of passionate engineers and take your career to new heights. Sign up today and experience the power of connection with CodeStream.</p>
                {!user && <a href="/signup"><button className="button has-background-black text-is-green m-4"  >Get Started</button></a>}
                {user && <a href="/stream"><button className="button has-background-black text-is-green m-4"  >See stream</button></a>}
            </div>
            <Footer />
            <div className="hero-filter p-6"></div> 
        </section>
    </>
    );
}
export default Home