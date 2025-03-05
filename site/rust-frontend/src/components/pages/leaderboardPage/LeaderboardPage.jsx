import { useEffect, useState } from "react";
import LeaderboardTable from "./LeaderboardTable";

import "./leaderboardPage-styles/leaderboardPage.css";

function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://rust-pkqo.onrender.com/api/users")
      .then((response) => response.json())
      .then((data) => {
        const W = 1.5;

        const processedUsers = data.map((user) => {
          const kd = user.kill - user.death * W;

          const resourceScore =
            user.wood * 0.01 +
            user.stone * 0.01 +
            user.metal * 0.1 +
            user.scrap * 0.3 +
            user.sulfur * 0.5 +
            user.hqm * 1;

          const totalScore = kd + resourceScore * 0.01;

          return { ...user, kd, resourceScore, totalScore };
        });

        setUsers(processedUsers);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load leaderboard");
        setLoading(false);
      });
  }, []);

  if (error) return <div className="error">{error}</div>;

  const isGameStillRunning = users.every((user) => user.resourceScore === 0);

  if (loading) {
    return <div className="loading">Завантаження...</div>;
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard__container">
        {isGameStillRunning ? (
          <div className="game-in-progress">Гра ще триває</div>
        ) : (
          <>
            <LeaderboardTable
              title="Overall Rankings"
              data={[...users].sort((a, b) => b.totalScore - a.totalScore)}
              type="total"
            />
            <LeaderboardTable
              title="KD Leaderboard"
              data={[...users].sort((a, b) => b.kd - a.kd)}
              type="kd"
            />
            <LeaderboardTable
              title="Farm Leaderboard"
              data={[...users].sort(
                (a, b) => b.resourceScore - a.resourceScore
              )}
              type="resource"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
