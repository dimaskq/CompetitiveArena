import "./rules-styles/rules.css";

function RulesPage() {
  return (
    <div className="rules">
      <h2 className="about__title">Rules</h2>
      <div className="rules__container">
        <div className="rules__info">
          <div className="rules__kd">
            <h2 className="rules__kd_title">KD розраховується за формулою:</h2>
            <p>
              <code>KD = Murders - (Deaths * W)</code>
            </p>
            <ul>
              <li>
                <span>Murders</span> – загальна кількість убивств
              </li>
              <li>
                <span>Deaths</span> – кількість смертей
              </li>
              <li>
                <span>W</span> – коефіцієнт штрафу за смерть (W = 1.5)
              </li>
            </ul>
          </div>
          <div className="rules__rs">
            <h3>3. Resource Score (Фермерські бали)</h3>
            <p>
              Гравці можуть отримувати бали за збір ресурсів. Коефіцієнти за
              кожен ресурс:
            </p>
            <ul>
              <li>
                <strong>Wood (wood)</strong> — <code>0.01x</code>
              </li>
              <li>
                <strong>Stone (stone)</strong> — <code>0.01x</code>
              </li>
              <li>
                <strong>Metal (metal)</strong> — <code>0.1x</code>
              </li>
              <li>
                <strong>Sera</strong> — <code>0.3x</code>
              </li>
              <li>
                <strong>Scrap (scrap)</strong> — <code>0.5x</code>
              </li>
              <li>
                <strong>Metal High Quality (mvk)</strong> — <code>1x</code>
              </li>
            </ul>
            <p>
              <strong>Формула розрахунку Resource Score:</strong>
            </p>
            <p>
              <code>
                Resource Score = (wood * 0.01) + (stone * 0.01) + (metal * 0.1)
                + (scrap * 0.3) + (sera * 0.5) + mvk
              </code>
            </p>
          </div>
        </div>
        <div className="rules__totalScore">
          <h3>Загальний підсумок (визначення переможця)</h3>
          <p>Щоб визначити переможця, застосовується остаточна формула:</p>
          <p>
            <code>TotalScore = KD + (ResourceScore * 0.01)</code>
          </p>
        </div>
        <div className="rules__explanation"></div>
      </div>
    </div>
  );
}

export default RulesPage;
