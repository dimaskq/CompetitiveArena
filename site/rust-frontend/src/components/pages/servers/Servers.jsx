import ServerPlan from "./ServerPlan";
import "./servers-styles/Servers.css";

const SERVERPLANS = [
  {
    title: "Solo",
    price: "$5",
    info: ["1 user", "300 max visitors", "$500 credit"],
  },
  {
    title: "Duo",
    price: "$10",
    info: ["2 users", "400 max visitors", "$600 credit"],
  },
  {
    title: "Trio",
    price: "$15",
    info: ["3 users", "450 max visitors", "$700 credit"],
  },
  {
    title: "Squad",
    price: "$20",
    info: ["4 users", "500 max visitors", "$800 credit"],
  },
];

function ServersPage() {
  return (
    <section className="serversPlans">
      <div className="serversPlans__header">
        <h1>Choose Your Perfect Server Plan</h1>
        <p>Flexible and affordable plans for every team size.</p>
      </div>
      <div className="serversPlans__container container">
        {SERVERPLANS.map((plan, index) => (
          <ServerPlan
            key={index}
            title={plan.title}
            price={plan.price}
            info={plan.info}
          />
        ))}
      </div>
    </section>
  );
}

export default ServersPage;