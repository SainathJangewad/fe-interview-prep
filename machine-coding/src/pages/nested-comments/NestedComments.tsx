// src/components/NestedComments.tsx

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import Comment from './comment/Comment';

interface CommentType {
    id: number;
    text: string;
    replies: Array<CommentType>;
}

const NestedComments: React.FC = () => {
    const [comments, setComments] = useState<CommentType[]>([
        { id: 1, text: "This is a comment.", replies: [] },
    ]);

    const addComment = (parentId: number | null, text: string) => {

        let commentAdded = false;
        const addReplyRecursively = (commentsList: CommentType[], parentId: number, text: string,): CommentType[] => {
            return commentsList.map((comment) => {
                if (comment.id === parentId) {
                    commentAdded = true;
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            { id: Date.now(), text, replies: [] },
                        ],
                    };
                }
                // After adding a comment at correct location no need to traverse further so return "comment" as-is 
                if (commentAdded) return comment;
                return {
                    ...comment,
                    replies: addReplyRecursively(comment.replies, parentId, text),
                };
            });
        };

        if (parentId === null) {
            // Add a top-level comment
            setComments([
                ...comments,
                { id: Date.now(), text, replies: [] },
            ]);
        } else {
            setComments(addReplyRecursively(comments, parentId, text));
        }
    };

    const editComment = (id: number, newText: string) => {
        const editCommentRecursively = (commentsList: CommentType[], id: number, newText: string): CommentType[] => {
            return commentsList.map((comment) => {
                if (comment.id === id) {
                    return { ...comment, text: newText };
                }
                return {
                    ...comment,
                    replies: editCommentRecursively(comment.replies, id, newText),
                };
            });
        };

        setComments(editCommentRecursively(comments, id, newText));


    };

    const deleteComment = (id: number) => {
        const deleteCommentRecursively = (commentsList: CommentType[], id: number): CommentType[] => {
            return commentsList
                .filter((comment) => {
                    if (comment.id !== id) {
                        comment.replies = deleteCommentRecursively(comment.replies, id);
                        return true;
                    } else {
                        return false;
                    }
                })
            // .map((comment) => ({
            //     ...comment,
            //     replies: deleteCommentRecursively(comment.replies, id),
            // }));
        };

        setComments(deleteCommentRecursively(comments, id));
    };

    return (
        <div>
            <h1>Nested Comments</h1>
            <div>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onAdd={addComment}
                        onEdit={editComment}
                        onDelete={deleteComment}
                    />
                ))}
            </div>
            <div style={{ marginTop: "20px" }}>
                <input
                    type="text"

                    placeholder="Add a new comment..."
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                            addComment(null, e.currentTarget.value);
                            e.currentTarget.value = "";
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default NestedComments;
