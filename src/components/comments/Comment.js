import CommentForm from "./CommentForm";
import "./index.css";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Dropdown } from "carbon-components-react";
import CommentDropDownMenu from "./CommentDropDownMenu";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete = currentUserId === comment.userId && replies.length === 0 && !timePassed;

    // currentUserId === comment.userId === 0 && !timePassed;

    // // console.log("testing id", comment.userId)
  const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;


  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      {/* <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div> */}

      <div className="comment-right-part">
        {/* <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div> */}
        <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
          <div style={{ textAlign: "right" }}>
            <div className="post-edit">
              <CommentDropDownMenu
                type="post-menu"
                post_id={comment.id}
                userprofile={currentUserId}
              />
            </div>
          </div>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={imgLink} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                {comment.username}
              </h4>
              {!isEditing && (
                <div>
                  <p style={{ textAlign: "left" }}>{comment.body}</p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    {createdAt}
                  </p>
                </div>
              )}
            </Grid>
          </Grid>
        </Paper>
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {/* {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )} */}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>

    // <div style={{ padding: 14 }} className="App" key={comment.id}>
    //   <h1>Comments</h1>
    //   <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
    //     <Grid container wrap="nowrap" spacing={2}>
    //       <Grid item>
    //         <Avatar alt="Remy Sharp" src={imgLink} />
    //       </Grid>
    //       <Grid justifyContent="left" item xs zeroMinWidth>
    //         <h4 style={{ margin: 0, textAlign: "left" }}>{comment.username}</h4>
    //         {!isEditing && <p style={{ textAlign: "left" }}>{comment} </p>}
    //         <p style={{ textAlign: "left", color: "gray" }}>{createdAt}</p>
    //         {isEditing && (
    //           <CommentForm
    //             submitLabel="Update"
    //             hasCancelButton
    //             initialText={comment.body}
    //             handleSubmit={(text) => updateComment(text, comment.id)}
    //             handleCancel={() => {
    //               setActiveComment(null);
    //             }}
    //           />
    //         )}
    //         <div className="comment-actions">
    //           {canReply && (
    //             <div
    //               className="comment-action"
    //               onClick={() =>
    //                 setActiveComment({ id: comment.id, type: "replying" })
    //               }
    //             >
    //               Reply
    //             </div>
    //           )}
    //           {canEdit && (
    //             <div
    //               className="comment-action"
    //               onClick={() =>
    //                 setActiveComment({ id: comment.id, type: "editing" })
    //               }
    //             >
    //               Edit
    //             </div>
    //           )}
    //           {canDelete && (
    //             <div
    //               className="comment-action"
    //               onClick={() => deleteComment(comment.id)}
    //             >
    //               Delete
    //             </div>
    //           )}
    //         </div>
    //       </Grid>
    //     </Grid>
    //   </Paper>
    // </div>
  );
};

export default Comment;
