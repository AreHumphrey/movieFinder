import React, { useState } from 'react'

interface Comment {
  id: number
  text: string
  date: string
}

interface Props {
  movieId: string
}

const CommentSection: React.FC<Props> = ({ movieId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      text: newComment.trim(),
      date: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setComments((prev) => [comment, ...prev])
    setNewComment('')
  }

  return (
    <div className="comments-container">
      <h2 className="comments-title">Комментарии</h2>

      <form onSubmit={handleAddComment} className="comment-form">
        <textarea
          placeholder="Оставьте комментарий..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <div className="comment-actions">
          <button type="submit" className="comment-submit">Отправить</button>
        </div>
      </form>

      {comments.length === 0 ? (
        <p className="no-comments">Комментариев пока нет — станьте первым!</p>
      ) : (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-card">
              <p className="comment-text">{comment.text}</p>
              <span className="comment-date">{comment.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CommentSection
