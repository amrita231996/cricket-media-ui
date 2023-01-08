import { useState, useRef, useCallback } from "react";
import { BallTriangle } from "react-loader-spinner";
import "./index.scss";
import useScroller from "../../commons/useScroller";
import { Grid } from "@mui/material";
import UserCard from "../followers/followers";
import { getStorageItem } from "../../utils/sessionStorage";



const FollowingPanel = (props) => {
    const {uid, ownFollowings, onFolloUnFollowToggle} = props;
    const accessToken = getStorageItem("token");

    const [query, setQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const [pagePerSize, setPagePerSize] = useState(6);

    const req = {
      method: "GET",
      url: global.config.ROOTURL.prod + "/auth/get-following-byuserid/" + uid + `/${pageNum}/${global.config.pagePerSize}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  
    // console.log('pagenumber', pageNum);
    const { isLoading, error, list, hasMore } = useScroller(query, pageNum, req);
    // console.log('listlist',list);
    const observer = useRef();
  
    const lastElementRef = useCallback(
      (node) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNum((prev) => prev + 1);
          }
        });
        if (node) observer.current.observe(node);
      },
      [isLoading, hasMore]
    );

    const Loader = () => {
        return (
          <div>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', padding:"40px"}}>
              {isLoading && (
                <BallTriangle
                  height="100"
                  width="100"
                  color="grey"
                  ariaLabel="loading"
                />
              )}
            </div>
            <div style={{color:"white"}}>{error && "Error"}</div>
        </div>)
      }
  
    return (
        <div style={{width:"100%"}}>
            <Grid container>
              {(list != []) &&
              list.map((follower, index) => {
                if (list.length === index + 1) {
                  return(
                    <Grid key={index} ref={lastElementRef} item xs={12} sm={12} lg={4} xl={3}>
                      <UserCard  
                      following={follower} 
                      followings={ownFollowings ? ownFollowings : []} 
                      onFolloUnFollowToggle={()=>{ onFolloUnFollowToggle();setPageNum(1) }}/>
                    </Grid>
                  )
              } else {
                return(
                  <Grid key={index} item xs={12} sm={12} lg={4} xl={3}>
                    <UserCard 
                    following={follower} 
                    followings={ownFollowings ? ownFollowings : []}
                    onFolloUnFollowToggle={()=>{ onFolloUnFollowToggle();setPageNum(1) }}
                    />
                  </Grid>
                )
              }
            }
            )}
            </Grid>
            <Loader />
        </div>
    )
}

export default FollowingPanel;