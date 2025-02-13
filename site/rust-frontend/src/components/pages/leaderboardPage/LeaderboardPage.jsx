import { useEffect, useState } from "react";
import LeaderboardTable from "./LeaderboardTable"; 

import "./styles/leaderboardPage.css";

function LeaderboardPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://rust-pkqo.onrender.com/api/users")
            .then(response => response.json())
            .then(data => {
                const W = 1.5;
                
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

export default LeaderboardPage;
