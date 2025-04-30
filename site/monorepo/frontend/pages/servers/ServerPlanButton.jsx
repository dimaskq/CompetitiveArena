import { useSelector } from "react-redux";

function ServerPlanButton({ title }) {
  const user = useSelector((state) => state.user.user);
  const isSolo = title === "Solo";

  const handleChooseServer = async () => {
    if (!isSolo) return; // Дозволяємо лише Solo

    if (!user) {
      alert("User not found!");
      return;
    }

    try {
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
        [title.toLowerCase()]: 1,
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
      <button
        className={`serversPlans__block_btn ${!isSolo ? "disabled" : ""}`}
        onClick={handleChooseServer}
        disabled={!isSolo}
      >
        {isSolo ? "Choose Server" : "Soon..."}
      </button>
    </div>
  );
}

export default ServerPlanButton;
