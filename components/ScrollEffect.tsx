import './ScrollEffect.css';

export default function ScrollEffect() {
  return (
    <div className="stuck-grid">
      <div className="grid-item name-reveal">
        <div className="name-container">
          <div className="name-part">
            <span className="big-d">D</span>
            <span className="slide-out">hruvsai</span>
          </div>
          <div className="name-part">
            <span className="big-d">D</span>
            <span className="slide-out">hulipudi</span>
          </div>
        </div>
      </div>
      <div className="grid-item">two</div>
      <div className="grid-item">three</div>
      <div className="grid-item">four</div>
      <div className="grid-item">five</div>
    </div>
  );
}

