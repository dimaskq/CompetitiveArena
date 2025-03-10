import { useSelector } from "react-redux";

function ServerPlanButton({ title }) {
  const user = useSelector((state) => state.user.user);

  const handleChooseServer = async () => {
    if (!user) {
      alert("User not found!");
      return;
    }

    try {
      // Знаходимо потрібний сервер у масиві
      const serverIndex = user.servers.findIndex(
        (server) => server[title.toLowerCase()] !== undefined
      );

      if (serverIndex === -1) {
        alert("Server mode not found!");
        return;
      }

      const updatedServers = [...user.servers];
      updatedServers[serverIndex] = {
        ...updatedServers[serverIndex],
        [title.toLowerCase()]: 1, // Встановлюємо режим у 1
      };

      const response = await fetch(`https://rust-pkqo.onrender.com/api/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ servers: updatedServers }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      alert(`Server plan "${title}" selected successfully!`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating server plan!");
    }
  };

  return (
    <div className="serversPlans__btn_block">
      <button className="serversPlans__block_btn" onClick={handleChooseServer}>
        Choose Server
      </button>
    </div>
  );
}

export default ServerPlanButton;
