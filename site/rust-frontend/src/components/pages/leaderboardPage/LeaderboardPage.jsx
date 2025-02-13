import { useEffect, useState } from "react";

function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://rust-pkqo.onrender.com/api/users")
            .then(response => response.json())
            .then(data => {
                // Вычисляем Resource Score
                const processedUsers = data.map(user => {
                    const resourceScore = 
                        (user.wood * 0.01) +
                        (user.stone * 0.01) +
                        (user.metal * 0.1) +
                        (user.scrap * 0.3) +
                        (user.sera * 0.5) +
                        (user.hqm * 1); // MVK = HQM

                    const totalScore = user.kd + (resourceScore * 0.01);

                    return { ...user, resourceScore, totalScore };
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

    // Сортируем пользователей для разных таблиц
    const topOverall = [...users].sort((a, b) => b.totalScore - a.totalScore);
    const topKD = [...users].sort((a, b) => b.kd - a.kd);
    const topFarming = [...users].sort((a, b) => b.resourceScore - a.resourceScore);

    return (
        <div className="leaderboard-container">
            {/* Общий Топ */}
            <LeaderboardTable title="Топ Общий" data={topOverall} type="total" />
            
            {/* Топ по KD */}
            <LeaderboardTable title="Топ по KD" data={topKD} type="kd" />

            {/* Топ по фармингу */}
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
                        {type === "kd" && <th>KD</th>}
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
                            {type === "kd" && <td>{user.kd.toFixed(2)}</td>}
                            {type === "resource" && (
                                <>
                                    <td>{user.wood}</td>
                                    <td>{user.stone}</td>
                                    <td>{user.metal}</td>
                                    <td>{user.sera}</td>
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
