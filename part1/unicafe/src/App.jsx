import { useState } from "react";

const StatisticLine = (props) => {
  return props.text == "positive" ? (
    <>
      <p>
        {props.text} {props.value}%
      </p>
    </>
  ) : (
    <p>
      {props.text} {props.value}
    </p>
  );
};

const Statistics = (props) => {
  return props.total > 0 ? (
    <>
      <h2>statistics</h2>
      {/* <p>positive {props.positive ? props.positive : 0}%</p> */}
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.total} />
      <StatisticLine text="average" value={props.total / 3} />
      <StatisticLine text="positive" value={props.positive} />
    </>
  ) : (
    <>
      <h2>statistics</h2>
      <h4>No feedback given</h4>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let total = good + bad + neutral;
  let pos = (good / total) * 100;

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        positive={pos}
      />
    </>
  );
};

export default App;
