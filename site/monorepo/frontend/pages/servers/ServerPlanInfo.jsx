function ServerPlanInfo({ info }) {
    return (
      <ul className="serversPlans__block_info">
        {info.map((item, index) => (
          <li key={index} className="serversPlans__info_item">
            {item}
          </li>
        ))}
      </ul>
    );
  }

export default ServerPlanInfo;
