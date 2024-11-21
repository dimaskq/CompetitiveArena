function ServerPlan({ title, price, info }) {
    return (
      <div className="serversPlans__block">
        <h2 className="serversPlans__block_title">{title}</h2>
        <p className="serversPlans__block_price">{price}</p>
        <ul className="serversPlans__block_info">
          {info.map((item, index) => (
            <li key={index} className="serversPlans__info_item">{item}</li>
          ))}
        </ul>
        <div className="serversPlans__btn_block">
            <a href="#" className="serversPlans__block_btn">Choose Server</a>
        </div>
      </div>
    );
  }
  
  export default ServerPlan;
  