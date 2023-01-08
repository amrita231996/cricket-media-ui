import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Post from "./post";
import "./index.scss";
import { getStorageItem } from "../../utils/sessionStorage";
import PostPage from "./post-page";

const FeedPage = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(null);
  const accessToken = getStorageItem("token");
  const { pid } = props;

  console.log("Feed page", props);

  const fetchFeedes = () => {
    axios({
      method: "get",
      url: global.config.ROOTURL.prod + "/feed/feedById/" + pid,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => {
        console.log(response)
        setPosts(response.data);
     
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          console.log(error);
        } else if (error?.response?.status === 401) {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    fetchFeedes();
   
  }, [pid]);

  return (
    <>
      <div className="component posts Feed-page">
        {/* {posts.map((post, index) => {
          return <Post key={index} post={post} accessToken={accessToken} />;
        })} */}
     
        {posts && <PostPage post={posts} accessToken={accessToken} />}
      </div>
    </>
  );
};

export default FeedPage;
