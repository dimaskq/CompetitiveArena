import { useEffect, useState } from "react";
import "./leaderboardPage-styles/leaderboardPage.css";
import LeaderboardSceleton from "./LeaderbordSceleton"; // Скелетон компонент

function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://rust-pkqo.onrender.com/api/users")
            .then(response => response.json())
            .then(data => {
                const W = 1.5; // Коефіцієнт покарання за смерті
                
                const processedUsers = data.map(user => {
                    const kd = user.kill - (user.death * W);
                    
                    const resourceScore = 
                        (user.wood * 0.01) +
                        (user.stone * 0.01) +
                        (user.metal * 0.1) +
                        (user.scrap * 0.3) +
                        (user.sulfur * 0.5) +
                        (user.hqm * 1);
                    
                    const totalScore = kd + (resourceScore * 0.01);

                    return { ...user, kd, resourceScore, totalScore };
                });

                setUsers(processedUsers);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load leaderboard");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const topOverall = [...users].sort((a, b) => b.totalScore - a.totalScore);
    const topKD = [...users].sort((a, b) => b.kd - a.kd);
    const topFarming = [...users].sort((a, b) => b.resourceScore - a.resourceScore);

    return (
        <div className="leaderboard">
            <div className="leaderboard__container">
                <LeaderboardTable title="Overall Rankings" data={topOverall} type="total" loading={loading} />
                <LeaderboardTable title="KD Leaderboard" data={topKD} type="kd" loading={loading} />
                <LeaderboardTable title="Farm Leaderboard" data={topFarming} type="resource" loading={loading} />
            </div>
        </div>
    );
}

const LeaderboardTable = ({ title, data, type, loading }) => {
    return (
        <div className="leaderboard__box">
            <h2 className="leaderboard__title">{title}</h2>
            <table className="leaderboard__table">
                <thead>
                    <tr>
                        <th className="leaderboard__rank">Rank</th>
                        <th>Name</th>
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
                    {loading
                        ? Array.from({ length: 10 }).map((_, index) => (
                              <tr key={index}>
                                  <td><LeaderboardSceleton /></td>
                                  <td><LeaderboardSceleton /></td>
                                  {type === "total" && (
                                      <>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                      </>
                                  )}
                                  {type === "kd" && (
                                      <>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                      </>
                                  )}
                                  {type === "resource" && (
                                      <>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                          <td><LeaderboardSceleton /></td>
                                      </>
                                  )}
                              </tr>
                          ))
                        : data.map((user, index) => (
                              <tr key={user.steamId} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                  <td className="leaderboard__table_rank">{index + 1}</td>
                                  <td className="leaderboard__table_playerName">{user.displayName}</td>
                                  {type === "total" && (
                                      <>
                                          <td>{user.kd.toFixed(2)}</td>
                                          <td>{user.resourceScore.toFixed(2)}</td>
                                          <td>{user.totalScore.toFixed(2)}</td>
                                      </>
                                  )}
                                  {type === "kd" && (
                                      <>
                                          <td>{user.kill}</td>
                                          <td>{user.death}</td>
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

export default LeaderboardPage;
