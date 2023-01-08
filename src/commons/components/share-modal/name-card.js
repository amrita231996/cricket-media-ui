import "./index.scss";
import defaultAvatar from "../../../assets/images/profile/default_avatar.png";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";

const NameCard = (props) => {
  const { postObj } = props;
  const [isImg, setIsImg] = useState(false);

  const isImgLink = (url) => {
    if (typeof url !== 'string') {
      return
    }
    setIsImg((url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null));
  }

  useEffect(() => {
    isImgLink(postObj.postImageURL
      ? postObj.postImageURL
      : "");    
  }, [postObj.postImageURL
  ])


  return (
    <div className="post">
      <div className="post-header">
        <div className="left">
          <div className="avatar">
            <img
              className="avatar-image"
              src={postObj.userProfilePhoto ? postObj.userProfilePhoto : defaultAvatar}
              alt={""}
            />
          </div>
          <div className="avatar-cnt">
            <p>
              <Link
                className="shared-link"
                to={`/profile/${postObj.userId}`}
                style={{ textDecoration: "none" }}
              >
                {postObj.userName}
              </Link>
            </p>
            <p className="date-time">
              {postObj.createdDate && (
                <ReactTimeAgo date={postObj.createdDate} locale="en-US" />
              )}
              <br />
            </p>
          </div>
        </div>
      </div>
      <div className="post-text">{postObj.postMessage}</div>
      <div className="share-attachment-content">
        {postObj.postImageURL ? (
          isImg ? (
            <img className="attch responsive" src={postObj.postImageURL} alt="" />
          ) : (
            <video width="400" className="attch responsive" controls>
              <source src={postObj.postImageURL} />
              Your browser does not support HTML5 video.
            </video>
          )
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default NameCard;
