

import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit"
import "./index.scss"
import defaultAvatar from "../../assets/images/profile/default_avatar.png";

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}


const UploadBtn = ({ setAvatarFile, avatar, onChangeprofilepic }) => {

  const [preview, setpreview] = useState(null);
  const [src, setSrc] = useState(defaultAvatar);
  const [dummydata, setdummydata] = useState(null);
  const [activebtn, setactivebtn] = useState(false);
  const [file, setfile] = useState(null);



  useEffect(() => {

    if (preview) {
     
      setfile(dataURLtoFile(preview, 'filename.png'));
     

    }
  }, [preview])


  const onCrop = (view) => {
    setpreview(view)

    setSrc(view)
    setactivebtn(true)

  }


  const handleprofile = (e) => {

    onChangeprofilepic(file);
    setactivebtn(false);
  }

  useEffect(() => {
    setactivebtn(false);
  }, [])

  return (
    <div style={{ display: "flex", paddingTop: "15px" }}>
      <div>
        <label htmlFor="upload-button">
          <span>
            <Avatar
              width={200}
              height={200}
              onCrop={onCrop}
              src={dummydata}
            />
            <div className="setImage">
              <div>
                <img src={src} className="upload-btn"></img>
              </div>
              <div>
                {
                  activebtn ?
                    <button
                      className="btnactive12"
                      onClick={handleprofile}
                    >set as a profile pic</button>
                    :
                    <button
                      className="btndisable"
                      disabled
                    >set as a profile pic</button>
                }
              </div>
            </div>
          </span>
        </label>


      </div>
    </div>

  );
};

export default UploadBtn;