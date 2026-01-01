import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/icons/Back.svg'

function Header({ title }) {
  const navigate = useNavigate()

  return (
    <div className="books-header">
      <button
        className="back-button"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1)
          } else {
            navigate('/')
          }
        }}
      >
        <img src={backIcon} alt="Back" />
      </button>
      <span className="books-title">{title}</span>
    </div>
  )
}

export default Header
