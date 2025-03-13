function ServerPlanHeader({ title, price }) {
    return (
      <>
        <h2 className="serversPlans__block_title">{title}</h2>
        <p className="serversPlans__block_price">{price}</p>
      </>
    );
}

export default ServerPlanHeader;