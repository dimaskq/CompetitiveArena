import React, { useState, createContext } from "react";
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
                    <span>W</span> – коефіцієнт штрафу за смерть (W = 1.5)
                  </li>
                </ul>
              </div>
              <div className="rules__rs">
                <h3 className="rules__rs_titile rules__kd_title">
                  1.2 Ресурсний рахунок
                </h3>
                <p className="rules__rs_info">
                  Гравці можуть заробляти очки за збирання ресурсів. Коефіцієнти
                  для кожного ресурсу:
                </p>
                <ul className="rules__rs_list rules__kd_list">
                  <li>
                    Дерево (wood) — <code>0.01x</code>
                  </li>
                  <li>
                    Камінь (stone) — <code>0.01x</code>
                  </li>
                  <li>
                    Метал (metal) — <code>0.1x</code>
                  </li>
                  <li>
                    Сірка - <code>0.3x</code>
                  </li>
                  <li>
                    Шматки (scrap) — <code>0.5x</code>
                  </li>
                  <li>
                    Високоякісний метал (mvk) — <code>1x</code>
                  </li>
                </ul>
                <h4 className="rules__rs_formulaTitle">
                  Формула обчислення ресурсного рахунку:
                </h4>
                <p className="rules__rs_formula rules__kd_formula">
                  <code>
                    Ресурсний рахунок = (wood * 0.01) + (stone * 0.01) + (metal
                    * 0.1) + (scrap * 0.3) + (sulfur * 0.5) + mvk
                  </code>
                </p>
              </div>
            </div>
            <div className="rules__totalScore">
              <h3 className="rules__totalScore_title rules__kd_title">
                1.3 Загальний результат
              </h3>
              <p>Для визначення переможця застосовується фінальна формула:</p>
              <p className="rules__totalScore_formula rules__kd_formula">
                <code>TotalScore = KD + (ResourceScore * 0.01)</code>
              </p>
            </div>
            <div className="rules__explanation">
              <h2 className="rules__general rules__win">
                2. ЩО НЕ МОЖНА РОБИТИ
              </h2>
              <p className="rules__general_title rules__kd_title">
                2.1 Загальні правила
              </p>
              <ul className="rules__general_list rules__kd_list">
                <li>2.1.1 Використовувати лише дозволені ігрові механіки.</li>
                <li>2.1.2 Образи, токсична поведінка та расизм заборонені.</li>
                <li>2.1.3 Не допомагати противнику.</li>
                <li>2.1.4 Заборонено класти лут в бази інших гравців.</li>
                <li>
                  2.1.5 Чити, макроси та будь-яке програмне забезпечення, яке
                  дає перевагу, заборонені.
                </li>
                <li>2.1.6 Заборонено рекламувати сторонні сервери.</li>
                <li>2.1.7 Заборонено видавати себе за адміністрацію.</li>
                <li>
                  2.1.8 Адміністрація має право забанити або покарати за
                  порушення правил без попередження.
                </li>
                <li>2.1.9 Оскарження бану можливе через канал Discord.</li>
                <li>
                  2.1.10 Адміністрація залишає за собою право виконувати
                  додаткові вайпи у разі серйозних помилок або порушень балансу.
                </li>
                <li>
                  2.1.11 Підозрілі гравці можуть бути перевірені адміністрацією
                  – адміністратори можуть вимагати скріншоти або запис гри.
                </li>
                <li>
                  2.1.12 Гравцям дозволяється продавати предмети у своїх
                  магазинах.
                </li>
                <li>
                  2.1.13 Гравці можуть обмінювати ресурси через торгові
                  автомати.
                </li>
              </ul>
              <p className="rules__solo_title rules__kd_title">
                2.2 Правила для соло-режиму
              </p>
              <ul className="rules__solo_list rules__kd_list">
                <li>
                  2.2.1 Заборонено об'єднуватися в групи, навіть тимчасово.
                </li>
                <li>
                  2.2.2 Спільні рейди, фермерство, PvP чи будь-яка допомога
                  іншому гравцеві заборонені.
                </li>
                <li>2.2.3 Заборонено рейдити з іншими гравцями.</li>
                <li>
                  2.2.4 Заборонено будувати спільні бази з іншими гравцями.
                </li>
                <li>
                  2.2.5 Заборонено вбивати гравців та повертати їхній лут для
                  створення альянсів.
                </li>
                <li>
                  2.2.6 Заборонено кемпити монументи разом та допомагати комусь
                  у PvP.
                </li>
                <li>
                  2.2.7 Гравці, які потрапили в командну гру, отримають бан.
                </li>
              </ul>
              <p className="rules__solo_title rules__kd_title">
                2.3 Правила для дуо-режиму
              </p>
              <ul className="rules__duo_list rules__kd_list">
                <li>2.3.1 Максимальний розмір команди - 2 гравці.</li>
                <li>
                  2.3.2 Заборонено об'єднуватися з іншими гравцями чи кланами.
                </li>
                <li>
                  2.3.3 Заборонено передавати ресурси або допомагати іншим
                  командам.
                </li>
                <li>
                  2.3.4 Якщо ваш партнер залишив гру, ви не можете тимчасово
                  грати з іншим гравцем.
                </li>
                <li>
                  2.3.5 Заборонено спільно контролювати монументи з іншими дуо.
                </li>
                <li>2.3.6 У одній базі може жити лише 2 гравці.</li>
                <li>2.3.7 Тимчасові альянси заборонені, навіть у PvP.</li>
                <li>
                  2.3.8 Гравці, які приєдналися до великих груп, будуть
                  забанені.
                </li>
              </ul>
              <p className="rules__trio_title rules__kd_title">
                2.4 Правила для тріо-режиму
              </p>
              <ul className="rules__trio_list rules__kd_list">
                <li>2.4.1 Максимальний розмір команди - 3 гравці.</li>
                <li>2.4.2 Тимчасові альянси між різними тріо заборонені.</li>
                <li>
                  2.4.3 Якщо один з членів вашої команди залишає гру, ви не
                  можете додати іншого гравця.
                </li>
                <li>2.4.4 У одній базі може жити лише 3 гравці.</li>
                <li>2.4.5 Будь-яка кооперація між різними тріо заборонена.</li>
                <li>
                  2.4.6 Гравці, які перевищують ліміт в 3 гравці, будуть
                  забанені.
                </li>
              </ul>
              <p className="rules__trio_title rules__kd_title">
                2.5 Правила для сквад-режиму
              </p>
              <ul className="rules__squad_list rules__kd_list">
                <li>2.5.1 Максимальний розмір команди - 4 гравці.</li>
                <li>2.5.2 Заборонено об'єднуватися з іншими командами.</li>
                <li>
                  2.5.3 Тимчасові альянси заборонені, навіть під час рейдів чи
                  боїв за монументи.
                </li>
                <li>
                  2.5.4 Якщо хтось залишає команду, новий гравець може
                  приєднатися тільки після вайпу або офіційного розриву.
                </li>
                <li>
                  2.5.5 Координовані атаки двох команд на одного ворога
                  заборонені.
                </li>
                <li>2.5.6 У одній базі може жити лише 4 гравці.</li>
                <li>
                  2.5.7 Якщо команда перевищить ліміт гравців - бан або вайп
                  акаунту.
                </li>
              </ul>
            </div>
          </div>
        );
      case "zh":
        return (
          <div className="rules__container">
            <div className="rules__info">
              <h2 className="rules__win">1.获胜规则</h2>
              <div className="rules__kd">
                <h3 className="rules__kd_title">1.1 KD 通过以下公式计算：</h3>
                <p className="rules__kd_formula">
                  <code>KD = 杀敌数 - (死亡数 * W)</code>
                </p>
                <ul className="rules__kd_list">
                  <li>
                    <span>杀敌数</span> – 杀敌的数量
                  </li>
                  <li>
                    <span>死亡数</span> – 死亡的数量
                  </li>
                  <li>
                    <span>W</span> – 死亡惩罚系数 (W = 1.5)
                  </li>
                </ul>
              </div>
              <div className="rules__rs">
                <h3 className="rules__rs_titile rules__kd_title">
                  1.2 资源分数
                </h3>
                <p className="rules__rs_info">
                  玩家通过收集资源获得积分。每种资源的系数为：
                </p>
                <ul className="rules__rs_list rules__kd_list">
                  <li>
                    木材（wood） — <code>0.01x</code>
                  </li>
                  <li>
                    石头（stone） — <code>0.01x</code>
                  </li>
                  <li>
                    金属（metal） — <code>0.1x</code>
                  </li>
                  <li>
                    硫磺（sulfur） - <code>0.3x</code>
                  </li>
                  <li>
                    废料（scrap） — <code>0.5x</code>
                  </li>
                  <li>
                    高品质金属（mvk） — <code>1x</code>
                  </li>
                </ul>
                <h4 className="rules__rs_formulaTitle">资源分数计算公式：</h4>
                <p className="rules__rs_formula rules__kd_formula">
                  <code>
                    资源分数 = (wood * 0.01) + (stone * 0.01) + (metal * 0.1) +
                    (scrap * 0.3) + (sulfur * 0.5) + mvk
                  </code>
                </p>
              </div>
            </div>
            <div className="rules__totalScore">
              <h3 className="rules__totalScore_title rules__kd_title">
                1.3 总分
              </h3>
              <p>为了确定胜者，使用最终公式：</p>
              <p className="rules__totalScore_formula rules__kd_formula">
                <code>总分 = KD + (资源分数 * 0.01)</code>
              </p>
            </div>
            <div className="rules__explanation">
              <h2 className="rules__general rules__win">2.禁止行为</h2>
              <p className="rules__general_title rules__kd_title">
                2.1 一般规则
              </p>
              <ul className="rules__general_list rules__kd_list">
                <li>2.1.1 只能使用允许的游戏机制。</li>
                <li>2.1.2 禁止侮辱、恶性行为和种族主义。</li>
                <li>2.1.3 禁止帮助不是队友的玩家。</li>
                <li>2.1.4 禁止将战利品放入其他玩家的基地。</li>
                <li>2.1.5 禁止使用作弊软件、宏和任何提供优势的程序。</li>
                <li>2.1.6 禁止宣传第三方服务器。</li>
                <li>2.1.7 禁止冒充管理员。</li>
                <li>
                  2.1.8 管理员有权在没有警告的情况下禁止或惩罚违反规则的玩家。
                </li>
                <li>2.1.9 可以通过Discord频道上诉禁令。</li>
                <li>
                  2.1.10
                  管理员保留在严重的bug或平衡问题情况下执行额外清除的权利。
                </li>
                <li>
                  2.1.11
                  管理员可以检查可疑玩家——管理员可能会要求截图或游戏录像。
                </li>
                <li>2.1.12 玩家可以在商店出售物品。</li>
                <li>2.1.13 玩家可以通过自动贩卖机交换资源。</li>
              </ul>
              <p className="rules__solo_title rules__kd_title">
                2.2 单人模式规则
              </p>
              <ul className="rules__solo_list rules__kd_list">
                <li>2.2.1 禁止临时组队。</li>
                <li>2.2.2 禁止共同攻打、农场、PvP，或帮助其他玩家。</li>
                <li>2.2.3 禁止与其他玩家一起攻打。</li>
                <li>2.2.4 禁止与其他玩家共同建造基地。</li>
                <li>2.2.5 禁止杀死玩家并归还其战利品以建立联盟。</li>
                <li>2.2.6 禁止共同在纪念碑旁守卫并协助他人PvP。</li>
                <li>2.2.7 参与团队游戏的玩家将被禁赛或清除账号。</li>
              </ul>
              <p className="rules__solo_title rules__kd_title">
                2.3 双人模式规则
              </p>
              <ul className="rules__duo_list rules__kd_list">
                <li>2.3.1 团队最大人数为2人。</li>
                <li>2.3.2 禁止与其他玩家或公会联合。</li>
                <li>2.3.3 禁止转移资源或帮助其他队伍。</li>
                <li>
                  2.3.4 如果你的队友离开游戏，你不能临时与其他玩家一起玩。
                </li>
                <li>2.3.5 禁止与其他双人队伍共同控制纪念碑。</li>
                <li>2.3.6 只能有2名玩家住在同一个基地。</li>
                <li>2.3.7 禁止在PvP时临时结盟。</li>
                <li>2.3.8 加入大队的玩家将被禁止。</li>
              </ul>
              <p className="rules__trio_title rules__kd_title">
                2.4 三人模式规则
              </p>
              <ul className="rules__trio_list rules__kd_list">
                <li>2.4.1 团队最大人数为3人。</li>
                <li>2.4.2 禁止不同三人组之间的临时联盟。</li>
                <li>
                  2.4.3 如果你的队友离开游戏，你不能将其他玩家添加到你的队伍中。
                </li>
                <li>2.4.4 只能有3名玩家住在同一个基地。</li>
                <li>2.4.5 禁止不同三人组之间的合作行为。</li>
                <li>2.4.6 超過3名玩家限制的玩家將被禁止。</li>
              </ul>
              <p className="rules__trio_title rules__kd_title">
                2.5 小队模式规则
              </p>
              <ul className="rules__squad_list rules__kd_list">
                <li>2.5.1 团队最大人数为4人。</li>
                <li>2.5.2 禁止与其他小队联合。</li>
                <li>2.5.3 即使在袭击或战斗纪念碑时，临时联盟也是禁止的。</li>
                <li>
                  2.5.4
                  如果某个队员离开队伍，则只有在清除或正式解散后才能加入新成员。
                </li>
                <li>2.5.5 两个小队协同攻击同一个敌人是禁止的。</li>
                <li>2.5.6 只能有4名玩家住在同一个基地。</li>
                <li>2.5.7 如果队伍人数超过限制，将会被禁赛或清除账号。</li>
              </ul>
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
                <p className="rules__rs_formulaTitle">
                  1. Resource Score calculation formula:
                </p>
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
                <li>2.2.7 Players caught in a team game will receive a ban.</li>
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
                  2.4.6 Players who exceed the 3-person limit will be banned.
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
        <button
          className={language === "en" ? "active" : ""}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={language === "uk" ? "active" : ""}
          onClick={() => setLanguage("uk")}
        >
          Українська
        </button>
        <button
          className={language === "zh" ? "active" : ""}
          onClick={() => setLanguage("zh")}
        >
          中文
        </button>
      </div>
      {renderRulesContainer()}
    </div>
  );
}

export default RulesPage;
