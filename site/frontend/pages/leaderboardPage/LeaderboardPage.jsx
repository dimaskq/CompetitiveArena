import { useEffect, useState } from "react";
import LeaderboardTable from "./LeaderboardTable";
import "./leaderboardPage-styles/leaderboardPage.css";
import { FadeLoader } from "react-spinners";

const MODES = [
  "solo",
  "duo",
  "trio",
  "squad",
  "solo2days",
  "duo2days",
  "trio2days",
  "squad2days",
];

function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMode, setSelectedMode] = useState("solo");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");
        const data = await response.json();

        const W = 1.5;
        const processedUsers = data
          .map((user) => {
            const serverData = user.servers.find(
              (server) => server[selectedMode] !== undefined
            );

            if (serverData) {
              const kd = serverData.kills - serverData.deaths * W;
              const resourceScore =
                (serverData.resources?.wood || 0) * 0.01 +
                (serverData.resources?.stone || 0) * 0.01 +
                (serverData.resources?.metal || 0) * 0.1 +
                (serverData.resources?.scrap || 0) * 0.3 +
                (serverData.resources?.sulfur || 0) * 0.5 +
                (serverData.resources?.hqm || 0) * 1;

              const totalScore = kd + resourceScore * 0.01;

              return {
                ...user,
                kd,
                resourceScore,
                totalScore,
                kills: serverData.kills,
                deaths: serverData.deaths,
                ...serverData.resources,
              };
            }
            return null;
          })
          .filter((user) => user !== null);

        setUsers(processedUsers);
      } catch (err) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMode]);

  if (error) return <div className="error">{error}</div>;

  if (loading) {
    return (
      <div className="loader">
        <FadeLoader color="#ffffff" margin={1} />
      </div>
    );
  }

  const isGameStillRunning =
    users.length === 0 || users.every((user) => user.totalScore === 0);

  return (
    <div className="leaderboard">
      <div className="leaderboard__controls">
        {MODES.map((mode) => (
          <button
            key={mode}
            className={`leaderboard__button ${
              selectedMode === mode ? "active" : ""
            }`}
            onClick={() => setSelectedMode(mode)}
          >
            {mode.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="leaderboard__container">
        {isGameStillRunning ? (
          <div className="game-in-progress">
            <p className="game-in-progress__text">
              The game is still in progress. The leaderboard will only be
              available after the game is over.
            </p>
          </div>
        ) : (
          <>
            <LeaderboardTable
              title={"Overall Rankings"}
              data={[...users].sort((a, b) => b.totalScore - a.totalScore)}
              type="total"
            />
            <LeaderboardTable
              title={"KD Leaderboard"}
              data={[...users].sort((a, b) => b.kd - a.kd)}
              type="kd"
            />
            <LeaderboardTable
              title={"Farm Leaderboard"}
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
