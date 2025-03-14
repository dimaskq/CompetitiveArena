const LeaderboardTable = ({ title, data, type, loading }) => {
  return (
    <div className="leaderboard__box">
      <h2 className="leaderboard__title">{title}</h2>
      <table className="leaderboard__table">
        <thead>
          <tr>
            <th className="leaderboard__rank">Rank</th>
            <th className="leaderboard__table_playerName">Name</th>
            {type === "total" && (
              <>
                <th>Total Score</th>
                <th>Resource Score</th>
                <th>KD</th>
              </>
            )}
            {type === "kd" && (
              <>
                <th>Kills</th>
                <th>Deaths</th>
                <th>KD</th>
              </>
            )}
            {type === "resource" && (
              <>
                <th>Wood</th>
                <th>Stone</th>
                <th>Metal</th>
                <th>Sulfur</th>
                <th>Scrap</th>
                <th>HQM</th>
                <th>Resource Score</th>
              </>
            )}
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
                    alt={`${user.displayName}'s avatar`}
                    className="player-avatar"
                  />
                  <span>{user.displayName}</span>
                </div>
              </td>
              {type === "total" && (
                <>
                  <td>{user.kd.toFixed(2)}</td>
                  <td>{user.resourceScore.toFixed(2)}</td>
                  <td>{user.totalScore.toFixed(2)}</td>
                </>
              )}
              {type === "kd" && (
                <>
                  <td>{user.kills}</td>
                  <td>{user.deaths}</td>
                  <td>{user.kd.toFixed(2)}</td>
                </>
              )}
              {type === "resource" && (
                <>
                  <td>{user.wood}</td>
                  <td>{user.stone}</td>
                  <td>{user.metal}</td>
                  <td>{user.sulfur}</td>
                  <td>{user.scrap}</td>
                  <td>{user.hqm}</td>
                  <td>{user.resourceScore.toFixed(2)}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
