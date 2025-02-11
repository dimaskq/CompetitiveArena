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
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>KD</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.steamId}>
                            <td>{index + 1}</td>
                            <td>{user.displayName}</td>
                            <td>{user.kd.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderboardPage;
