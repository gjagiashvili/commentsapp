import { useState } from "react";

const Comment = ({
  item,
  replyHandler,
  data,
  type,
  handleDelete,
  itemIndex,
  replyIndex,
  setDataState
}) => {

  
  const isYou =
    data?.currentUser?.username === item.user.username || item.isCurrentUser;

  const [modalToggle, setModalToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  const [score, setScore] = useState(item.score); 
  const [scoreIncreased, setScoreIncreased] = useState(false)
  const [scoreDecreased, setScoreDecreased] = useState(false)

  const handleToggle = () => {
    setModalToggle(!modalToggle);
  };

  const handleEditToggle = () => {
    setEditToggle(!editToggle);
  };

  const handleEditContentChange = (e) => {
    setEditedContent(e.target.value);
  };
  
  const increaseScore = () => {
    setScore(score + 1);
  };

  const decreaseScore = () => {
    if (score > 0) {
      setScore(score - 1);
      setScoreDecreased(true);
    }
  };

  const handleEditSave = () => {
    if (type) {
      const updatedReply = {
        ...data.comments[itemIndex].replies[replyIndex],
        content: editedContent,
      };
  
      setDataState((prevDataState) => {
        const updatedComments = [...prevDataState.comments];
        const updatedReplies = [...updatedComments[itemIndex].replies];
        updatedReplies[replyIndex] = updatedReply;
        updatedComments[itemIndex] = {
          ...updatedComments[itemIndex],
          replies: updatedReplies,
        };
        return {
          ...prevDataState,
          comments: updatedComments,
        };
      });
    } else {
      const updatedComment = {
        ...data.comments[itemIndex],
        content: editedContent,
      };
  
      setDataState((prevDataState) => {
        const updatedComments = [...prevDataState.comments];
        updatedComments[itemIndex] = updatedComment;
        return {
          ...prevDataState,
          comments: updatedComments,
        };
      });
    }
    setEditToggle(false);
  };
  

  return (
    <div className="container">
      <div className="rating-side">
        <button onClick={increaseScore}>
          <img src="/images/icon-plus.svg" alt="" />
        </button>
        <button>
          <p>{score}</p>
        </button>
        <button onClick={decreaseScore}>
          <img src="/images/icon-minus.svg" alt="" />
        </button>
      </div>
      <div className="text-side">
        <div className="header">
          <div className="header-title">
            <img src={item.user.image.png} alt="" />
            {isYou && <div className="you">you</div>}
            <p>{item.user.username}</p>
            <p className="postedAt">{item.createdAt}</p>
          </div>
          {!isYou ? (
            <div
              className="reply-box"
              onClick={() => replyHandler(item.id - 1)}
            >
              <img src="/images/icon-reply.svg" alt="" />
              <p>Reply</p>
            </div>
          ) : (
            <div className="config-box">
              <div className="delete" onClick={() => handleToggle()}>
                <img src="/images/icon-delete.svg" alt="" />
                <p>delete</p>
              </div>
              <div className="edit" onClick={() => handleEditToggle()}>
                <img src="/images/icon-edit.svg" alt="" />
                <p>edit</p>
              </div>
            </div>
          )}
          {modalToggle && (
            

<div className="modal-container">
<div className="modal">
  <h2 className="modal-title"><b>Delete Comment</b></h2>
  <p> Are you sure you would like to delete this comment? This will remove the comment and can't be undone.   </p>
  <div className="modal-buttons">
    <button className="modal-button  undo" onClick={handleToggle}>
      No, cancel
    </button>
    <button className="modal-button do" onClick={() => handleDelete(itemIndex, replyIndex)}>
      Yes, delete
    </button>
  </div>
</div>
</div>
          )}
        </div>
        {!editToggle ? (
          <div className="footer">
            {type ? (
              <p>
                <span>@{item.replyingTo}</span>
                {item.content}
              </p>
            ) : (
              <p>{item.content}</p>
            )}
          </div>
        ) : (
          <div className="footer">
            <textarea
              className="edit-input"
              type="text"
              value={editedContent}
              onChange={handleEditContentChange}
            />
            <button onClick={handleEditSave} className="edit-btn">Update</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
