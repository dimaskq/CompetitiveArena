import { useEffect, useState } from "react";

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const topOverall = [...users].sort((a, b) => b.totalScore - a.totalScore);
    const topKD = [...users].sort((a, b) => b.kd - a.kd);
    const topFarming = [...users].sort((a, b) => b.resourceScore - a.resourceScore);

    return (
        <div className="leaderboard-container">
            <LeaderboardTable title="Топ Общий" data={topOverall} type="total" />
            <LeaderboardTable title="Топ по KD" data={topKD} type="kd" />
            <LeaderboardTable title="Топ по фармингу" data={topFarming} type="resource" />
        </div>
    );
}

const LeaderboardTable = ({ title, data, type }) => {
    return (
        <div className="leaderboard">
            <h2>{title}</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ім'я</th>
                        {type === "total" && <th>Total Score</th>}
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
                        <tr key={user.steamId}>
                            <td>{index + 1}</td>
                            <td>{user.displayName}</td>
                            {type === "total" && <td>{user.totalScore.toFixed(2)}</td>}
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