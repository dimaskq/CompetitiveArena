import { useEffect, useState } from "react";

function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://rust-pkqo.onrender.com/api/users")
            .then(response => response.json())
            .then(data => {
                const sortedUsers = data.sort((a, b) => b.kd - a.kd);
                setUsers(sortedUsers);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load leaderboard");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="leaderboard">
            <h1>Топ користувачів по KD</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Ім'я</th>
                        <th>Wood</th>
                        <th>Stone</th>
                        <th>Metal</th>
                        <th>Sulfur</th>
                        <th>Scrap</th>
                        <th>HQM</th>
                        <th>KD</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.steamId}>
                            <td>{index + 1}</td>
                            <td>{user.displayName}</td>
                            <td>{user.wood}</td>
                            <td>{user.stone}</td>
                            <td>{user.metal}</td>
                            <td>{user.sulfur}</td>
                            <td>{user.scrap}</td>
                            <td>{user.hqm}</td>
                            <td>{user.kd.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderboardPage;
