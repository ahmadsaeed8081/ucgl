import React, { useState } from "react";
import Loader from "../../components/Loader";
import Wrapper from "../../routes/Wrapper";
import { EditIcon } from "../../icons";

const Profile = (props) => {
  const [profileImage, setProfileImage] = useState();
  const [posterImage, setPosterImage] = useState();

  return (
    <div className="profile-page flex">
      <div className="_bg_vector w-full">
        <div className="top-vector"></div>
        <Wrapper>
          <div className="wrap wrapWidth flex flex-col">
            <div
              className="user-poster flex"
              style={{
                backgroundImage: posterImage
                  ? `url(${URL.createObjectURL(posterImage)})`
                  : `url("/images/pbg.png")`,
              }}
            >
              <div className="poster-edit-sec flex justify-end">
                <div
                  className="poster-edit flex items-center justify-center cursor-pointer"
                  onClick={() =>
                    document.getElementById("upload_poster_image").click()
                  }
                >
                  <EditIcon />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  title=""
                  name="image"
                  id="upload_poster_image"
                  className="select-poster-img cleanbtn"
                  onChange={(e) => {
                    setPosterImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="profile-img-sec flex items-center justify-center">
                <div
                  className="user-img relative"
                  style={{
                    backgroundImage: profileImage
                      ? `url(${URL.createObjectURL(profileImage)})`
                      : `url("/images/user1.png")`,
                  }}
                >
                  <div
                    className="p-img-edit flex items-center justify-center absolute cursor-pointer"
                    onClick={() =>
                      document.getElementById("upload_image").click()
                    }
                  >
                    <EditIcon />
                  </div>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  title=""
                  name="image"
                  id="upload_image"
                  className="select-user-img cleanbtn"
                  onChange={(e) => {
                    setProfileImage(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div className="form-block flex flex-col">
              <div className="grid_box">
                <div className="input-field flex flex-col">
                  <div className="lbl">First Name</div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="txt cleanbtn"
                    value={props.response.firstName}
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="lbl">Last Name</div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="txt cleanbtn"
                    value={props.response.lastName}
                  />
                </div>
              </div>
              <div className="grid_box">
                <div className="input-field flex flex-col">
                  <div className="lbl">Email</div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="txt cleanbtn"
                    value={props.response.email}
                  />
                </div>
                <div className="input-field flex flex-col">
                  <div className="lbl">Age</div>
                  <input
                    type="text"
                    placeholder="Phone No."
                    className="txt cleanbtn"
                    value={props.response.age}

                  />
                </div>
              </div>
              <div className="action flex items-center">
                <button className="btn button">Update</button>
              </div>
            </div>
          </div>
        </Wrapper>
        <div className="btm-vector"></div>
      </div>
    </div>
  );
};

export default Profile;
