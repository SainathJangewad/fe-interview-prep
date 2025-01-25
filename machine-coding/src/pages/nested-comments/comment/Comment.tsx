// src/components/Comment.tsx

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface IComment{
    id: number;
    text: string;
    replies: Array<IComment>;
    level: number;
}

interface CommentProps {
  comment:IComment;
  onAdd: (parentId: number | null, text: string) => void;
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onAdd, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [replyText, setReplyText] = useState("");

  const handleEdit = () => {
    if (isEditing) {
      onEdit(comment.id, editText); // Save edited comment
    }
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleReply = () => {
    if (replyText.trim()) {
      onAdd(comment.id, replyText); // Add reply
      setReplyText(""); // Clear input
    }
  };

  return (
    <div style={{ marginLeft: `${comment.level * 20}px`, borderLeft: "1px solid #ccc", paddingLeft: "10px", marginTop: "10px" }}>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          style={{ marginRight: "10px" }}
        />
      ) : (
        <span>{comment.text}</span>
      )}

      <div style={{ marginTop: "5px" }}>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
        {!isEditing && (
          <div>
            <input
              type="text"
              value={replyText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setReplyText(e.target.value)}
              placeholder="Reply..."
              style={{ marginRight: "10px" }}
            />
            <button onClick={handleReply}>Reply</button>
          </div>
        )}
      </div>

      {/* Render Replies */}
      {comment.replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onAdd={onAdd}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Comment;
