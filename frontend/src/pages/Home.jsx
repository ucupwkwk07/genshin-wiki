import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Genshin Impact Wiki</h1>
      <div className="home-description">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Fusce sit amet arcu vehicula, fermentum sapien vel, suscipit est. Morbi auctor efficitur elit ut vehicula. Aenean sit amet est et lorem tincidunt dignissim nec sed eros. Etiam vitae nunc ut odio consectetur iaculis in vitae velit.</p>
        <p>Curabitur vel enim ac nisi fermentum tincidunt vel non felis. Integer lacinia venenatis erat id egestas. In eu nibh in tortor pharetra auctor a id sem. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      </div>
      <div className="home-content">
      <div className="home-card">
          <img src="https://picsum.photos/seed/picsum/200/300" alt="Characters" className="home-card-image" />
          <p>Explore the characters of Genshin Impact.</p>
        </div>
        <div className="home-card">
          <img src="https://picsum.photos/200" alt="Weapons" className="home-card-image" />
          <p>Discover powerful weapons and their details.</p>
        </div>
        <div className="home-card">
          <img src="https://picsum.photos/200/300?grayscale" alt="Artifacts" className="home-card-image" />
          <p>Learn about artifacts and their bonuses.</p>
        </div>
        <div className="home-card">
          <img src="https://picsum.photos/200" alt="Characters" className="home-card-image" />
          <p>Explore the characters of Genshin Impact.</p>
        </div>
        <div className="home-card">
          <img src="https://picsum.photos/200/300/?blur" alt="Weapons" className="home-card-image" />
          <p>Discover powerful weapons and their details.</p>
        </div>
        <div className="home-card">
          <img src="https://picsum.photos/200" alt="Artifacts" className="home-card-image" />
          <p>Learn about artifacts and their bonuses.</p>
        </div>
        <div className="home-card">
          <img src="https://picsum.photos/200/300/?blur" alt="Artifacts" className="home-card-image" />
          <p>Learn about artifacts and their bonuses.</p>
        </div>
        <div className="home-card">
          <img src="https://picsum.photos/200/300?grayscale" alt="Characters" className="home-card-image" />
          <p>Explore the characters of Genshin Impact.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
