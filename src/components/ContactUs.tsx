
import React from "react";
import Footer from "./Footer";

const ContactUs: React.FC = () => {
  return (<>
    <section className="section m-0 p-0">
      <div className="content p-6">
        <div className="container has-text-centered ">
        <h1 className="title is-size-1 mb-3">Help page</h1>
        <h2 className="title is-size-3">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="container p-5">
        <h3 className="title is-size-5">
          1. What is CodeStream?      </h3>
        <p > CodeStream is a social media platform designed specifically for software engineers. It provides a space where engineers can connect, collaborate, and stay informed about the latest developments in the world of software engineering.</p>
      </div>
      <div className="container p-5">
        <h3 className="title is-size-5">
          2. How do I join CodeStream?      </h3>
        <p > Joining CodeStream is easy! Simply visit our website and sign up for an account.</p>
      </div>
      <div className="container p-5">
        <h3 className="title is-size-5">
          3. Is CodeStream free to use?     </h3>
        <p >  Yes, CodeStream is completely free to use for all software engineers. There are no hidden fees or subscription charges.</p>
      </div>
      <div className="container p-5">
        <h3 className="title is-size-5">
          4. What features does CodeStream offer? </h3>
        <ul>
          <li>Profile creation and customization</li>
          <li>Connecting with other software engineers</li>
          <li>Sharing projects and code snippets</li>
        </ul>    </div>
      <div className="container p-5">
        <h3 className="title is-size-5">
          5. Can I use CodeStream to find job opportunities?     </h3>
        <p > While CodeStream primarily focuses on connecting and collaborating with other engineers, you may come across job opportunities through networking with other users or participating in discussions and events. However, CodeStream is not a dedicated job search platform. </p>
      </div>
      <div className="container p-5">
        <h3 className="title is-size-5">
          6. Can I access CodeStream on mobile devices?</h3>
        <p > Yes, CodeStream is accessible on both desktop and mobile devices.</p>
      </div>
      <div className="container p-5">
        <h3 className="title is-size-5">
          7. How can I report inappropriate behavior or content on CodeStream? </h3>
        <p > If you encounter any inappropriate behavior or content on CodeStream, please report it to our moderation team immediately. You can do this by clicking on the "Report" button located next to the content in question.</p>
      </div>
      <div className="container p-5 mb-6">
        <h3 className="title is-size-5">
          8. How can I provide feedback or suggest new features for CodeStream?  </h3>
        <p > We value feedback from our users! If you have any suggestions for improving CodeStream or would like to report a bug, please reach out to our support team through the "Contact Us" page on our website.</p>
      </div>
      </div>
      <div className="content m-0 p-4 has-background-black">
        <h2 className="title is-size-3 has-text-centered has-text-green">
          Contact us
        </h2>
        <p className="has-text-centered has-text-white">If you have any questions, feedback, or inquiries, please don't hesitate to reach out to us. We're here to help!</p>
        <p className="has-text-centered has-text-white">You can contact us through the following methods:</p>
        <ul className="has-text-white">
          <li>Email: <a href="mailto:contact@codestream.com">contact@codestream.com</a></li>
          <li>Phone: +1 (555) 123-4567</li>
          <li>Address: 123 CodeStream Blvd, Cityville, State, Country</li>
        </ul>
        <div className="field m-3">
          <div className="control">
            <input className="input has-border-green" type="text" placeholder="Name"/>
          </div>
        </div>
        <div className="field m-3">
          <div className="control">
            <input className="input has-border-green" type="text" placeholder="Email"/>
          </div>
        </div>
        <div className="field is-horizontal m-3">
          <div className="field-body">
            <div className="field ">
              <div className="control">
                <textarea className="textarea has-border-green" placeholder="Explain how we can help you"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal m-3">

          <div className="field-body">
            <div className="field">
              <div className="control">
                <button className="button has-background-black">
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </section >
    <Footer /> </>
  );
};

export default ContactUs;