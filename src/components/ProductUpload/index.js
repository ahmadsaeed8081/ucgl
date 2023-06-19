import React, { useState, useEffect } from "react";
import { UploadIcon } from "../../icons";

const ProductUpload = () => {
  const [profileImage, setProfileImage] = useState();
  return (
    <div className="product-upload-popup flex">
      <div className="product-upload-popup-wrapper flex flex-col">
        <div className="popup-hdr flex items-center">Add Product</div>
        <div className="form-block flex flex-col">
          <div className="input-field flex items-center">
            <div className="upload-img flex items-center">
              {profileImage ? (
                <div
                  className="profile-image"
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(
                      profileImage
                    )})`,
                  }}
                />
              ) : (
                <div className="image-box flex items-center justify-center">
                  <UploadIcon />
                </div>
              )}
              <div className="image-action flex flex-col">
                <div className="img-lbl">Upload Picture</div>
                <button
                  className="btn-upload button"
                  onClick={() =>
                    document.getElementById("upload_image").click()
                  }
                >
                  Browse
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                title=""
                name="image"
                id="upload_image"
                className="select-file cleanbtn"
                onChange={(e) => {
                  setProfileImage(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="grid_box">
            <div className="input-field flex flex-col">
              <input
                type="text"
                placeholder="Product Name"
                className="txt cleanbtn"
              />
            </div>
            <div className="input-field flex flex-col">
              <input type="text" placeholder="Price" className="txt cleanbtn" />
            </div>
          </div>
          <div className="input-field flex flex-col">
            <textarea
              type="text"
              placeholder="Descriptions"
              className="txt cleanbtn min-h-[200px]"
            />
          </div>
          <div className="action flex items-center">
            <button className="btn button">Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
