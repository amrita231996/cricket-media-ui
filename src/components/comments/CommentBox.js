import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactTimeAgo from "react-time-ago";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { FaUserCircle } from "react-icons/fa";
import { textFieldClasses } from "@mui/material";
import "./index.css";
import axios from "axios";
import { clearStorage, getStorageItem } from "../../utils/sessionStorage";

function CommentBox(props) {
  const accessToken = getStorageItem("token");
  const userId = getStorageItem("user_id");
  const { comment } = props;
  const [readMore, setReadMore] = useState(false);
  const [id, setId] = useState();
  const text = comment.text;
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);
  const countWords = (desc) => {
    // Split the description into an array of words
    const words = desc.split(" ");

    // Initialize a new string and a counter variable
    let wordCount = 0;

    // Iterate over the array of words
    for (const word of words) {
      console.log(words);
      wordCount++;
    }

    //Setting up the word count
    setCount(wordCount);
  };

  function Description(desc) {
    // Split the description into an array of words
    const words = desc.split(" ");

    // Initialize a new string and a counter variable
    let truncatedDescription = "";
    let wordCount = 0;

    // Iterate over the array of words
    for (const word of words) {
      console.log(words);
      // Add the word to the new string
      truncatedDescription += word + " ";
      wordCount++;

      // If the counter has reached 150, break out of the loop
      if (wordCount >= 30) {
        break;
      }
    }

    // Truncate the string to remove any excess words
    truncatedDescription = truncatedDescription.trim();

    setShortDescription(truncatedDescription);
  }
  useEffect(() => {
    setDescription(props.comment.text);
    Description(props.comment.text);
    countWords(props.comment.text);
  });
  
  return (
    <div className="App">
      {/* <h1>Comments</h1> */}
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item className="comment-image-wrapper">
          {comment.userProfilePhoto ? (
            <img
              alt=""
              src={comment.userProfilePhoto}
              className="comment-image"
            />
          ) : (
            <FaUserCircle className="comments-user-icon" />
          )}
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Link className="comment-name" to={`/profile/${comment.userId}`}>
            <p style={{ margin: 0, textAlign: "left" }}>{comment.userName}</p>
          </Link>
          <p className="comment-time">
            {comment.createdDate && (
              <ReactTimeAgo date={comment.createdDate} locale="en-US" />
            )}
          </p>
          {count < 50 ? (
            // <p className="comment-text">{comment.text} </p>
            <p
              className="comment-text"
              dangerouslySetInnerHTML={{
                __html: description.replace(/\n\r?/g, "<br />"),
              }}
            />
          ) : !readMore ? (
            <p className="comment-text">
              {/* {comment.text.substring(0, 50) + " ..."} */}
              <p
                className="comment-text"
                dangerouslySetInnerHTML={{
                  __html: shortDescription.replace(/\n\r?/g, "<br />"),
                }}
              />{" "}
              ...
              <span
                className="read-more"
                onClick={() => {
                  setReadMore(!readMore);
                }}
              >
                read more
              </span>
            </p>
          ) : (
            <>
              <p
                className="comment-text"
                dangerouslySetInnerHTML={{
                  __html: description.replace(/\n\r?/g, "<br /> "),
                }}
              />
              <span
                className="read-more"
                onClick={() => {
                  setReadMore(!readMore);
                }}
              >
                read less
              </span>
            </>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CommentBox;
