import "./index.scss";
import defaultAvatar from "../../assets/images/profile/default_avatar.png";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const NameCard = (props) => {
  const { newSharedDetail, postObj } = props;
  return (
    <div className="post" style={{background:"transparent", padding:"0", margin: "0"}}>
      <div className="post-header">
        <div className="left">
          <div className="avatar">
            <img
              className="avatar-image"
              src={newSharedDetail.profilePhoto ? newSharedDetail.profilePhoto : defaultAvatar}
              alt={""}
            />
          </div>
          <div className="avatar-cnt">
            <p>
              <Link
                className="shared-link"
                to={`/profile/${newSharedDetail.userId}`}
                style={{ textDecoration: "none" }}
              >
                {newSharedDetail.firstName + " " + newSharedDetail.lastName}
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
    </div>
  );
};

export default NameCard;
