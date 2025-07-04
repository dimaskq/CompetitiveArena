import ServerPlan from "./ServerPlan";
import "./servers-styles/Servers.css";

const SERVERPLANS = [
  {
    title: "Solo",
    price: "$5",
    info: ["1 user", "300 max visitors", "min $200"],
  },
  {
    title: "Duo",
    price: "$10",
    info: ["2 users", "400 max visitors", "min $400"],
  },
  {
    title: "Trio",
    price: "$15",
    info: ["3 users", "450 max visitors", "min $500"],
  },
  {
    title: "Squad",
    price: "$20",
    info: ["4 users", "500 max visitors", "min $600"],
  },
];

function ServersPage() {
  return (
    <section className="serversPlans">
      <header className="serversPlans__header">
        <h1>Choose Your Perfect Server Plan</h1>
        <p>Flexible and affordable plans for every team size.</p>
      </header>
      <div className="serversPlans__container container">
        {SERVERPLANS.map(({ title, price, info }) => (
          <ServerPlan key={title} title={title} price={price} info={info} />
        ))}
      </div>
    </section>
  );
}

export default ServersPage;
