import ServerPlan from "./ServerPlan";
import "./servers-styles/Servers.css"

const SERVERPLANS = [
    {
      title: "Solo",
      price: "5 $",
      info: ["1 person", "300 people ", "500 $"]
    },
    {
      title: "Duo",
      price: "4 $",
      info: ["2 person", "400 people", "600 $"]
    },
    {
      title: "Trio",
      price: "3 $",
      info: ["3 person", "450 people", "700 $"]
    },
    {
        title: "Squad",
        price: "2 $",
        info: ["4 person", "500 people", "800 &"]
    }
  ];

function ServersPage() {
  return (
    <section className="serversPlans">
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
