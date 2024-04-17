import React from "react";
import Footer from "./Footer";

function AboutUs() {
  React.useEffect(() => {
    console.log("The About Us Page has mounted");
  }, []);

  return (
    <>
      <section className="section is-flex is-flex-direction-column is-align-items-center is-justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="container text-center">
          <h1 className="title has-text-centered m-6 is-1">About Us</h1>
          <div className="content has-text-centered">
            
            
            <h2>Welcome to CodeStream: Where Engineers Unite</h2>
            <p>At CodeStream, we believe in the power of community to elevate the world of software engineering.</p>
            <p>Our platform is designed exclusively for software engineers, providing a dynamic space where they can connect, collaborate, and innovate like never before.</p>
            
            
            <h2>Empowering Connections</h2>
            <p>CodeStream is more than just a social network; it's a vibrant ecosystem where engineers can forge meaningful connections with like-minded professionals from around the globe.</p>
            <p>Whether you're a seasoned veteran or just starting your journey in the world of software development, you'll find a welcoming community ready to support and inspire you.</p>
            
            
            <h2>Stay Informed and Inspired</h2>
            <p>In the fast-paced world of technology, staying informed is crucial. With CodeStream, you'll never miss out on the latest trends, tools, and insights shaping the software engineering landscape.</p>
            <p>From informative articles and thought-provoking discussions to exclusive webinars and events, we provide the resources you need to stay ahead of the curve.</p>
          
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutUs;