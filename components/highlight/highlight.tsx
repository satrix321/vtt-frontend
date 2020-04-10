import './highlight.scss'

const Highlight: React.FunctionComponent = () => {
  return (
    <section className="highlight">
      <div className="highlight-media">
        <img src="/fantasy-2847724_1920.jpg" alt="game image" />
      </div>
      <div className="highlight-text">
        <div className="highlight-title">VTT</div>
        <div className="highlight-subtitle">The Best Way to Play</div>
        <div className="highlight-description">Connect with your friends around the world, and immerse yourself in your own fantasy worlds! Sed odit laborum non. Totam optio praesentium sunt autem.</div>
        <div className="highlight-cta-container">
          <a href="https://www.google.com" className="highlight-cta">TRY IT NOW!</a>
        </div>
      </div>
    </section>
  )
}

export default Highlight