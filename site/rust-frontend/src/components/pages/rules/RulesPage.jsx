import "./rules-styles/rules.css";

function RulesPage() {
  return (
    <div className="rules">
      <h2 className="about__title">Rules</h2>
      <div className="rules__container">
        <div className="rules__info">
          <h2 className="rules__win">1.RULES FOR WINNING</h2>
          <div className="rules__kd">
            <h3 className="rules__kd_title">
              1.1 KD is calculated by the formula:
            </h3>
            <p className="rules__kd_formula">
              <code>KD = Murders - (Deaths * W)</code>
            </p>
            <ul className="rules__kd_list">
              <li>
                <span>Murders</span> – number of murders
              </li>
              <li>
                <span>Deaths</span> – number of deaths
              </li>
              <li>
                <span>W</span> – death penalty coefficient (W = 1.5)
              </li>
            </ul>
          </div>
          <div className="rules__rs">
            <h3 className="rules__rs_titile rules__kd_title">
              1.2 Resource Score
            </h3>
            <p className="rules__rs_info">
              Гравці можуть отримувати бали за збір ресурсів. Коефіцієнти за
              кожен ресурс:
            </p>
            <ul className="rules__rs_list rules__kd_list">
              <li>
                Wood (wood) — <code>0.01x</code>
              </li>
              <li>
                Stone (stone) — <code>0.01x</code>
              </li>
              <li>
                Metal (metal) — <code>0.1x</code>
              </li>
              <li>
                Sera— <code>0.3x</code>
              </li>
              <li>
                Scrap (scrap) — <code>0.5x</code>
              </li>
              <li>
                Metal High Quality (mvk) — <code>1x</code>
              </li>
            </ul>
            <h3 className="rules__rs_title rules__kd_title">
              1.3 Формула розрахунку Resource Score:
            </h3>
            <p className="rules__rs_formula rules__kd_formula">
              <code>
                Resource Score = (wood * 0.01) + (stone * 0.01) + (metal * 0.1)
                + (scrap * 0.3) + (sera * 0.5) + mvk
              </code>
            </p>
          </div>
        </div>
        <div className="rules__totalScore">
          <h3 className="rules__totalScore_title rules__kd_title">
            Загальний підсумок (визначення переможця)
          </h3>
          <p>Щоб визначити переможця, застосовується остаточна формула:</p>
          <p className="rules__totalScore_formula rules__kd_formula">
            <code>TotalScore = KD + (ResourceScore * 0.01)</code>
          </p>
        </div>
        <div className="rules__explanation">
          <h2 className="rules__general rules__win">2.WHAT CAN'T BE DONE</h2>
          <ul className="rules__general_list rules__kd_list">
            <li>Use of bugs</li>
            <li>Racism</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RulesPage;
