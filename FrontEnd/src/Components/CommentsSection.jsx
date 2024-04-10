import React, { useState, useRef, useEffect } from "react";
import comment from "./comment.json";
import { LiaCommentsSolid } from "react-icons/lia";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import CommentAction from "./CommentAction";
const CommentsSection = ({
  comments,
  handleInsertNode,
  handleUpdateNode,
  handleDeleteNode,
}) => {
  // const[ data ,setData]=useState(comment);
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };
  const onAddComment = () => {
    console.log("HI");
    if (editMode) {
      handleUpdateNode(comments.id, inputRef?.current?.innerText);
    } else {
      console.log("inside");
      setExpand(true);
      handleInsertNode(comments.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comments.id);
  };

  return (
    <div className="m-10">
      <div>
        {comments.container == "main" ? (
          <div className="flex flex-col justify-start mt-5">
            <textarea
              type="text"
              placeholder="Add comment"
              className="px-0 md:w-1/2  md:h-40 sm:h-32  sm:w-full text-sm text-gray-900  focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 bg-slate-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              onClick={onAddComment}
              className="bg-button-color hover:bg-button-color-hover h-10 w-32 text-custom-white m-2 ml-0"
            >
              {" "}
              COMMENT
            </button>
            {/* <CommentAction  type="COMMENT" handleClick={onAddComment} /> */}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <div>
              <div className="rounded-full overflow-hidden bg-gray-300 sm:w-8 sm:h-8 md:h-20 md:w-20">
                <img
                  class="w-full h-full object-cover"
                  src="../../user.jpg"
                  alt="Avatar"
                />
              </div>
            </div>
            <div className=" flex flex-col">
              <p className="text-blue-800">TrippyWay Agent</p>
              <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                ref={inputRef}
                className="text-[20px]"
              >
                {comments.message}
              </span>
            

            <div className="flex flex-row gap-1 ">
              {editMode ? (
                <div className="flex flex-row justify-center">
                  <CommentAction type="Save" handleClick={onAddComment} />
                  <CommentAction
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comments.message;
                      setEditMode(false);
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-row justify-center gap-3">
                  <CommentAction
                    type={<>{expand ? <BiDownArrow /> : <BiUpArrow />} REPLY</>}
                    handleClick={handleNewComment}
                  />
                  <CommentAction
                    type="EDIT"
                    handleClick={() => setEditMode(true)}
                  />
                  <CommentAction type="DELETE" handleClick={handleDelete} />
                </div>
              )}
            </div>
            </div>
          </div>
        )}
      </div>
      <div className="pl-7 " style={{ display: expand ? "block" : "none" }}>
        {showInput && (
          <>
            <input
              type="text"
              placeholder="Add comment"
              className="px-0 md:w-1/2  md:h-32 sm:h-24  sm:w-full text-sm text-gray-900  focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800 bg-slate-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex flex-row  gap-2">
              <CommentAction type="REPLY" handleClick={onAddComment} />
              <CommentAction
                type="CANCEL"
                handleClick={() => {
                  setShowInput(false);
                }}
              />
            </div>
          </>
        )}
        {comments?.replies?.map((cmt) => {
          return (
            <CommentsSection
              key={cmt.id}
              comments={cmt}
              handleInsertNode={handleInsertNode}
              handleUpdateNode={handleUpdateNode}
              handleDeleteNode={handleDeleteNode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
