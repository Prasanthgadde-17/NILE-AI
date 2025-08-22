import {useState, useEffect, useRef} from 'react'
import './index.css'

// helper to generate unique IDs
function uniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}

export default function ChatWidget({
  apiUrl = 'http://localhost:5000/api/chat',
}) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024,
  )

  const containerRef = useRef(null)
  const messagesEndRef = useRef(null)

  // track window resize
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages, suggestions, open])

  async function send() {
    const text = input.trim()
    if (!text) return

    const userMsg = {id: uniqueId(), role: 'user', text}
    setMessages(m => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const resp = await fetch(apiUrl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: text}),
      })
      const data = await resp.json()

      if (!resp.ok) {
        const errMsg = data?.error || 'Server error'
        setMessages(m => [
          ...m,
          {id: uniqueId(), role: 'assistant', text: `Sorry — ${errMsg}`},
        ])
        setSuggestions([])
      } else {
        const assistantText = data.reply || data.message || 'Sorry, no reply.'
        const products = Array.isArray(data.products) ? data.products : []

        setMessages(m => [
          ...m,
          {id: uniqueId(), role: 'assistant', text: assistantText},
        ])
        setSuggestions(products)
      }
    } catch (err) {
      setMessages(m => [
        ...m,
        {
          id: uniqueId(),
          role: 'assistant',
          text: "Sorry — I couldn't reach the AI service right now.",
        },
      ])
      setSuggestions([])
      console.error('ChatWidget error:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const isMobile = windowWidth < 640
  const containerStyle = {
    width: isMobile ? '100vw' : '30vw',
    height: isMobile ? '100vh' : '60vh',
    right: isMobile ? 0 : '1.5rem',
    left: isMobile ? 0 : undefined,
    borderRadius: isMobile ? 0 : '12px',
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          aria-label="open chat"
          onClick={() => setOpen(true)}
          className="chat-open-btn"
        >
          Chat
        </button>
      )}

      {open && (
        <div
          ref={containerRef}
          className="chat-container"
          style={containerStyle}
        >
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">Shop Assistant</div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-placeholder">
                Hi! Ask me about our products or say hi 👋
              </div>
            )}

            {messages.map(m => (
              <div
                key={m.id}
                className={`chat-message-row ${
                  m.role === 'user' ? 'chat-user' : 'chat-assistant'
                }`}
              >
                <div className="chat-message">{m.text}</div>
              </div>
            ))}

            {/* Product suggestions */}
            {suggestions.length > 0 && (
              <div className="chat-suggestions">
                <div className="chat-suggestions-title">
                  Recommended for you
                </div>
                {suggestions.map(p => (
                  <a
                    key={p.id || p.url || p.title}
                    href={p.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chat-suggestion-item"
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title || 'product image'}
                        className="chat-suggestion-img"
                        onError={e => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="chat-suggestion-noimg">No image</div>
                    )}
                    <div className="chat-suggestion-info">
                      <div className="chat-suggestion-title">{p.title}</div>
                      <div className="chat-suggestion-price">
                        ₹{p.price ?? '—'}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <textarea
              className="chat-input"
              placeholder="Ask about products or say hi"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Chat input"
            />
            <button
              type="button"
              disabled={loading}
              onClick={send}
              className="chat-send-btn"
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
