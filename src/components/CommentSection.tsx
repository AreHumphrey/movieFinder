import React, { useEffect, useState } from 'react'
import { addComment, getComments } from '../api/backend'
import { useNavigate } from 'react-router-dom'

interface Comment {
  id: number
  text: string
  date: string
  user?: string
}

interface Props {
  movieId: string
}

const CommentSection: React.FC<Props> = ({ movieId }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [showModal, setShowModal] = useState(false)

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    getComments(movieId).then((res) => {
      setComments(res.data)
    })
  }, [movieId])

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault()

    const validToken =
      token && token !== 'null' && token !== 'undefined' && token.trim().length > 0

    if (!validToken) {
      setShowModal(true)
      return
    }

    if (!newComment.trim()) return

    try {
      await addComment(movieId, newComment, token!)
      setNewComment('')
      const res = await getComments(movieId)
      setComments(res.data)
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 422) {
        localStorage.removeItem('token')
        setShowModal(true)
      } else {
        alert('Ошибка при добавлении комментария')
      }
    }
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
              <span className="comment-date">{new Date(comment.date).toLocaleString('ru-RU')}</span>
              {comment.user && (
                <div style={{ fontSize: '0.85rem', color: '#888' }}>
                  От: {comment.user}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-window">
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h3 className="modal-title">Вы не вошли в систему</h3>
            <p className="modal-text">Чтобы оставить комментарий, пожалуйста, выполните вход.</p>
            <button className="modal-login-btn" onClick={() => navigate('/login')}>
              Войти
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentSection
