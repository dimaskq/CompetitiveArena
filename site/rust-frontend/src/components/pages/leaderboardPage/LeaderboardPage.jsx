import { useEffect, useState } from "react";
import LeaderboardTable from "./LeaderboardTable";
import "./leaderboardPage-styles/leaderboardPage.css";
import { FadeLoader } from "react-spinners";

function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://rust-pkqo.onrender.com/api/users")
      .then((response) => response.json())
      .then((data) => {
        const W = 1.5;

        const processedUsers = data
          .map((user) => {
            const soloServer = user.servers.find(
              (server) => server.solo !== undefined
            );

            if (soloServer) {
              const kd = soloServer.kills - soloServer.deaths * W;

              const resourceScore =
                soloServer.resources.wood * 0.01 +
                soloServer.resources.stone * 0.01 +
                soloServer.resources.metal * 0.1 +
                soloServer.resources.scrap * 0.3 +
                soloServer.resources.sulfur * 0.5 +
                soloServer.resources.hqm * 1;

              const totalScore = kd + resourceScore * 0.01;

              return { ...user, kd, resourceScore, totalScore };
            }

            return null;
          })
          .filter((user) => user !== null);

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
    return (
      <div className="loader">
        <FadeLoader color="#ffffff" margin={1} />
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard__container">
        {isGameStillRunning ? (
          <div className="game-in-progress">
            <div className="game-in-progress__title">
              The game is still in progress.
            </div>
            <p className="game-in-progress__text">
              The game is still in progress. The leaderboard will only be
              available after the game is over.
            </p>
          </div>
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
