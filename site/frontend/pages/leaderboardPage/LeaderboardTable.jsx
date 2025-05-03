const LeaderboardTable = ({ title, data, type, loading }) => {
  const columns = {
    total: ["Total Score", "Resource Score", "KD"],
    kd: ["Kills", "Deaths", "KD"],
    resource: [
      "Wood",
      "Stone",
      "Metal",
      "Sulfur",
      "Scrap",
      "HQM",
      "Resource Score",
    ],
  };

  const getColumnData = (user) => {
    switch (type) {
      case "total":
        return [user.totalScore, user.resourceScore, user.kd];
      case "kd":
        return [user.kills, user.deaths, user.kd];
      case "resource":
        return [
          user.wood,
          user.stone,
          user.metal,
          user.sulfur,
          user.scrap,
          user.hqm,
          user.resourceScore,
        ];
      default:
        return [];
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="leaderboard__box">
      <h2 className="leaderboard__title">{title}</h2>
      <table className="leaderboard__table">
        <thead>
          <tr>
            <th className="leaderboard__rank">Rank</th>
            <th className="leaderboard__table_playerName">Name</th>
            {columns[type]?.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr
              key={user.steamId}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td className="leaderboard__table_rank">{index + 1}</td>
              <td className="leaderboard__table_playerName">
                <div className="player-info">
                  <img
                    src={user.avatar || "default-avatar.png"}
                    alt={
                      user.displayName
                        ? `${user.displayName}'s avatar`
                        : "User avatar"
                    }
                    className="player-avatar"
                  />
                  <span>{user.displayName}</span>
                </div>
              </td>
              {getColumnData(user).map((value, i) => (
                <td key={i}>
                  {typeof value === "number" ? value.toFixed(2) : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
