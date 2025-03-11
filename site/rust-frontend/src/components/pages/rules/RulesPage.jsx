import React, { useState, useContext, createContext } from "react";
import "./rules-styles/rules.css";

const LanguageContext = createContext("en");

function RulesPage() {
  const [language, setLanguage] = useState("en");

  const renderRulesContainer = () => {
    switch (language) {
      case "uk":
        return (
          <div className="rules__container">
            <div className="rules__info">
              <h2 className="rules__win">1. ПРАВИЛА ДЛЯ ПЕРЕМОГИ</h2>
              <div className="rules__kd">
                <h3 className="rules__kd_title">
                  1.1 KD обчислюється за формулою:
                </h3>
                <p className="rules__kd_formula">
                  <code>KD = Вбивства - (Смерті * W)</code>
                </p>
                <ul className="rules__kd_list">
                  <li>
                    <span>Вбивства</span> – кількість вбивств
                  </li>
                  <li>
                    <span>Смерті</span> – кількість смертей
                  </li>
                  <li>
                    <span>W</span> – коефіцієнт покарання за смерть (W = 1.5)
                  </li>
                </ul>
              </div>
              <div className="rules__rs">
                <h3 className="rules__rs_title rules__kd_title">
                  1.2 Оцінка ресурсів
                </h3>
                <ul className="rules__rs_list">
                  <li>
                    Дерево — <code>0.01x</code>
                  </li>
                  <li>
                    Камінь — <code>0.01x</code>
                  </li>
                  <li>
                    Метал — <code>0.1x</code>
                  </li>
                  <li>
                    Сірка — <code>0.3x</code>
                  </li>
                  <li>
                    Скраб — <code>0.5x</code>
                  </li>
                  <li>
                    Високоякісний метал (mvk) — <code>1x</code>
                  </li>
                </ul>
                <h3 className="rules__rs_title rules__kd_title">
                  1.3 Формула оцінки ресурсів
                </h3>
                <p className="rules__rs_formula">
                  <code>
                    Оцінка ресурсів = (дерево * 0.01) + (камінь * 0.01) + (метал
                    * 0.1) + (скраб * 0.3) + (сірка * 0.5) + mvk
                  </code>
                </p>
              </div>
            </div>
          </div>
        );
      case "zh":
        return (
          <div className="rules__container">
            <div className="rules__info">
              <h2 className="rules__win">1. 胜利规则</h2>
              <div className="rules__kd">
                <h3 className="rules__kd_title">1.1 KD 的计算公式如下：</h3>
                <p className="rules__kd_formula">
                  <code>KD = 杀人 - (死亡 * W)</code>
                </p>
                <ul className="rules__kd_list">
                  <li>
                    <span>杀人</span> – 杀人数量
                  </li>
                  <li>
                    <span>死亡</span> – 死亡数量
                  </li>
                  <li>
                    <span>W</span> – 死亡惩罚系数 (W = 1.5)
                  </li>
                </ul>
              </div>
              <div className="rules__rs">
                <h3 className="rules__rs_title rules__kd_title">
                  1.2 资源评分
                </h3>
                <ul className="rules__rs_list">
                  <li>
                    木材 — <code>0.01x</code>
                  </li>
                  <li>
                    石材 — <code>0.01x</code>
                  </li>
                  <li>
                    金属 — <code>0.1x</code>
                  </li>
                  <li>
                    硫磺 — <code>0.3x</code>
                  </li>
                  <li>
                    废料 — <code>0.5x</code>
                  </li>
                  <li>
                    高质量金属 (mvk) — <code>1x</code>
                  </li>
                </ul>
                <h3 className="rules__rs_title rules__kd_title">
                  1.3 资源评分计算公式
                </h3>
                <p className="rules__rs_formula">
                  <code>
                    资源评分 = (木材 * 0.01) + (石材 * 0.01) + (金属 * 0.1) +
                    (废料 * 0.3) + (硫磺 * 0.5) + mvk
                  </code>
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return (
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
                  Players can earn points for collecting resources. The odds for
                  each resource are:
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
                    Sulfur - <code>0.3x</code>
                  </li>
                  <li>
                    Scrap (scrap) — <code>0.5x</code>
                  </li>
                  <li>
                    Metal High Quality (mvk) — <code>1x</code>
                  </li>
                </ul>
                <h3 className="rules__rs_title rules__kd_title">
                  1.3 Resource Score calculation formula:
                </h3>
                <p className="rules__rs_formula rules__kd_formula">
                  <code>
                    Resource Score = (wood * 0.01) + (stone * 0.01) + (metal *
                    0.1) + (scrap * 0.3) + (sulfur * 0.5) + mvk
                  </code>
                </p>
              </div>
            </div>
            <div className="rules__totalScore">
              <h3 className="rules__totalScore_title rules__kd_title">
                1.4 Overall result
              </h3>
              <p>To determine the winner, the final formula is applied:</p>
              <p className="rules__totalScore_formula rules__kd_formula">
                <code>TotalScore = KD + (ResourceScore * 0.01)</code>
              </p>
            </div>
            <div className="rules__explanation">
              <h2 className="rules__general rules__win">
                2.WHAT CAN'T BE DONE
              </h2>
              <p className="rules__general_title rules__kd_title">
                2.1 General rules
              </p>
              <ul className="rules__general_list rules__kd_list">
                <li>2.1.1 Use only permitted game mechanics.</li>
                <li>
                  2.1.2 Insults, toxic behavior, and racism are prohibited.
                </li>
                <li>2.1.3 Help not a teammate</li>
                <li>
                  2.1.4 It is forbidden to place loot in other players' bases.
                </li>
                <li>
                  2.1.5 Cheats, macros, and any software that gives an advantage
                  are prohibited.
                </li>
                <li>
                  2.1.6 It is prohibited to advertise third-party servers.
                </li>
                <li>
                  2.1.7 It is forbidden to impersonate the administration.
                </li>
                <li>
                  2.1.8 The administration has the right to ban or punish for
                  violating the rules without warning.
                </li>
                <li>2.1.9 Appealing a ban is possible via Discord channel</li>
                <li>
                  2.1.10 The administration reserves the right to perform
                  additional wipes in the event of serious bugs or balance
                  violations.
                </li>
                <li>
                  2.1.11 Suspicious players may be checked by the administration
                  – admins may request a screenshot or game recording.
                </li>
                <li>
                  2.1.12 Players are allowed to sell items in their stores
                </li>
                <li>
                  2.1.13 Players can exchange resources through a vending
                  machine
                </li>
              </ul>
              <p className="rules__solo_title rules__kd_title">
                2.2 Rules for solo mode
              </p>
              <ul className="rules__solo_list rules__kd_list">
                <li>
                  2.2.1 It is forbidden to unite in groups, even temporarily.
                </li>
                <li>
                  2.2.2 Joint raids, farming, PvP, or any assistance to another
                  player is prohibited.
                </li>
                <li>2.2.3 It is forbidden to raid with another player.</li>
                <li>
                  2.2.4 It is forbidden to build joint bases with other players.
                </li>
                <li>
                  2.2.5 It is forbidden to kill players and return their loot to
                  create alliances.
                </li>
                <li>
                  2.2.6 It is forbidden to camp monuments together and help
                  someone in PvP.
                </li>
                <li>
                  2.2.7 Players caught in a team game will receive a ban or
                  account wipe.
                </li>
              </ul>
              <p className="rules__solo_title rules__kd_title">
                2.3 Rules for duo mode
              </p>
              <ul className="rules__duo_list rules__kd_list">
                <li>2.3.1 Maximum team size is 2 players.</li>
                <li>
                  2.3.2 It is forbidden to unite with other players or clans.
                </li>
                <li>
                  2.3.3 It is forbidden to transfer resources or help other
                  teams.
                </li>
                <li>
                  2.3.4 If your partner has left the game, you cannot
                  temporarily play with another player.
                </li>
                <li>
                  2.3.5 It is forbidden to jointly control monuments with other
                  people's duos.
                </li>
                <li>2.3.6 Only 2 players can live in the same base.</li>
                <li>2.3.7 Temporary alliances are prohibited, even in PvP.</li>
                <li>2.3.8 Players who join large groups will be banned.</li>
              </ul>
              <p className="rules__trio_title rules__kd_title">
                2.4 Rules for trio mode
              </p>
              <ul className="rules__trio_list rules__kd_list">
                <li>2.4.1 Maximum team size is 3 players.</li>
                <li>
                  2.4.2 Temporary alliances between different trios are
                  prohibited.
                </li>
                <li>
                  2.4.3 If one of your team members leaves the game, you cannot
                  add another player to your team.
                </li>
                <li>2.4.4 Only 3 players can live in one base.</li>
                <li>
                  2.4.5 Any cooperative actions between different trios are
                  prohibited.{" "}
                </li>
                <li>
                  2.4.6 Players who exceed the 3-person limit will be banned or
                  have their account wiped.
                </li>
              </ul>
              <p className="rules__trio_title rules__kd_title">
                2.5 Rules for squad mode
              </p>
              <ul className="rules__squad_list rules__kd_list">
                <li>2.5.1 Maximum team size is 4 players.</li>
                <li>2.5.2 It is forbidden to unite with other squads.</li>
                <li>
                  2.5.3 Temporary alliances are prohibited, even during raids or
                  battles for monuments.
                </li>
                <li>
                  2.5.4 If someone leaves the team, a new member can only join
                  after a wipe or an official breakup.
                </li>
                <li>
                  2.5.5 Coordinated attacks by two squads on one enemy are
                  prohibited.
                </li>
                <li>2.5.6 Only 4 players can live in one base.</li>
                <li>
                  2.5.7 If the team exceeds the player limit - ban or wipe of
                  the account.
                </li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="rules">
      <h2 className="rules__title about__title">Rules</h2>
      <div className="rules__languageBtn">
        <button onClick={() => setLanguage("en")}>English</button>
        <button onClick={() => setLanguage("uk")}>Українська</button>
        <button onClick={() => setLanguage("zh")}>中文</button>
      </div>
      {renderRulesContainer()}
    </div>
  );
}

export default RulesPage;
