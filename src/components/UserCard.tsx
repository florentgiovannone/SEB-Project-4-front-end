import { IUser } from "../interfaces/user";

function UserCard({ firstname, lastname, username, id, email, image }: IUser) {
    return (
      <div className="column is-one-third-desktop is-half-tablet is-full-mobile">
        <div className="card background-is-grey mgb-large m-3">
          <div className="card-content p-0 m-0">
            <div className="content">
              <p className="card-title has-text-centered is-rouge m-0 has-text-weight-bold">{`Firstname: ${firstname}`}</p>
              <p className="card-title has-text-centered is-rouge m-0 has-text-weight-bold">{`Lastname: ${lastname}`}</p>
            </div>
          </div>
          <div className="card-content background-is-grey m">
            {!image && <div className="card-image">
              <figure className="image is-4by5">
                <img
                  src={`https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png`}
                  alt="Placeholder image"
                  style={{ objectFit: "cover" }}
                />
              </figure>
            </div>}
            {image && <div className="card-image">
              <figure className="image is-4by5">
                <img
                  src={image}
                  alt="Placeholder image"
                  style={{ objectFit: "cover" }}
                />
              </figure>
            </div>}
            <div className="content">
              <p className="card-title has-text-centered has-text-black pt-4 has-text-weight-bold">{`Username: ${username}`}</p>
            </div>
            <div className="columns has-text-centered is-centered is-multiline mt-5">
              <a href={`/post/${id}`}><button className="button is-outlined is-primary m-2">{`See ${username}'s posts`}</button></a>
              <a href={`/account/${id}`}><button className="button is-outlined is-primary m-2">{`See ${username}'s account`}</button></a>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default UserCard;