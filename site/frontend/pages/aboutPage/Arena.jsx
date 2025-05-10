import "./aboutPage-styles/aboutPage.css";

const Arena = () => {
  return (
    <div className="arena">
      <section className="arena__section">
        <h1 className="arena__title">About Competitive Arena</h1>
        <p className="arena__text">
          Welcome to Competitive Arena, the ultimate platform for Rust fans to
          dive into thrilling tournaments and epic battles. Join a passionate
          community of survivors, compete for exclusive prizes, and claim
          ultimate bragging rights!
        </p>
      </section>

      <section className="arena__section">
        <h2 className="arena__subtitle">What is Competitive Arena?</h2>
        <p className="arena__text">
          Competitive Arena is a platform for video game enthusiasts,
          particularly Rust players, where you can participate in exciting
          tournaments on our servers. We create a space where everyone,
          regardless of experience, can compete, have fun, and win real prizes.
          Here’s how it works in simple terms.
        </p>
      </section>

      <section className="arena__section">
        <h2 className="arena__subtitle">What We Offer</h2>
        <ul className="arena__list">
          <li className="arena__list-item">
            12 servers for playing Rust:
            <ul className="arena__sublist">
              <li className="arena__sublist-item">
                8 servers host 7-day tournaments.
              </li>
              <li className="arena__sublist-item">
                4 servers host weekend tournaments.
              </li>
            </ul>
          </li>
          <li className="arena__list-item">
            Each server supports up to 400 players.
          </li>
          <li className="arena__list-item">
            Symbolic entry fee for each tournament.
          </li>
          <li className="arena__list-item">
            Prize pool grows with the number of players.
          </li>
          <li className="arena__list-item">Only one winner per server!</li>
        </ul>
      </section>

      <section className="arena__section">
        <h2 className="arena__subtitle">What’s It Like for Players?</h2>
        <ol className="arena__list arena__list--numbered">
          <li className="arena__list-item">Register on the platform.</li>
          <li className="arena__list-item">Choose a tournament.</li>
          <li className="arena__list-item">Pay the fee.</li>
          <li className="arena__list-item">Compete in Rust.</li>
          <li className="arena__list-item">Win the full prize pool!</li>
        </ol>
      </section>

      <section className="arena__section">
        <h2 className="arena__subtitle">Why It’s Awesome</h2>
        <ul className="arena__list">
          <li className="arena__list-item">Accessibility: Anyone can join.</li>
          <li className="arena__list-item">
            Real Prizes: The more players — the higher the reward.
          </li>
          <li className="arena__list-item">
            Adrenaline: One winner, full prize, full thrill.
          </li>
          <li className="arena__list-item">
            Community: Play with hundreds of Rust fans.
          </li>
        </ul>
      </section>

      <section className="arena__section">
        <h2 className="arena__subtitle">Our Plans and Dreams</h2>
        <p className="arena__text">
          We’re not just about Rust servers. Our goal is to become a platform
          for global tournaments...
        </p>
        <ul className="arena__list">
          <li className="arena__list-item">More servers and games.</li>
          <li className="arena__list-item">
            Thousands of international players.
          </li>
          <li className="arena__list-item">Famous gaming competitions.</li>
          <li className="arena__list-item">Massive world-class events.</li>
        </ul>
      </section>

      <section className="arena__section">
        <h2 className="arena__subtitle">Our Community</h2>
        <p className="arena__text">
          Competitive Arena is more than a platform — it’s a vibrant community
          of Rust players, from casual survivors to competitive pros. Whether
          you’re grinding for loot, teaming up for a clan war, or organizing a
          massive tournament, Competitive Arena is your home for epic Rust
          battles.
        </p>
        <p className="arena__text">
          Join us today and forge your legacy in the world of Rust!
        </p>
      </section>

      <section className="arena__section">
        <h2 className="arena__subtitle">Why Should You Try It?</h2>
        <p className="arena__text">
          Competitive Arena is your chance to feel part of a massive gaming
          community, compete for big prizes, and enjoy your favorite game. If
          you love Rust or other popular games, we’re building a place just for
          you! And remember: the world belongs to the bold!
        </p>
      </section>
    </div>
  );
};

export default Arena;
