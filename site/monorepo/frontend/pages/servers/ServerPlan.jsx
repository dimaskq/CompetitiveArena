import ServerPlanHeader from './ServerPlanHeader';
import ServerPlanInfo from './ServerPlanInfo';
import ServerPlanButton from './ServerPlanButton';

function ServerPlan({ title, price, info }) {
  return (
    <div className="serversPlans__block">
      <ServerPlanHeader title={title} price={price} />
      <ServerPlanInfo info={info} />
      <ServerPlanButton title={title} />
    </div>
  );
}

export default ServerPlan;

