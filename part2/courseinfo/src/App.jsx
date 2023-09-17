/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */

// Your component code here

/* eslint-enable react/prop-types */

// const Header = (props) => {
//   return <h1>{props.course.name}</h1>;
// };

// const Content = (props) => {
//   let arr0 = props.course.parts[0];
//   let arr1 = props.course.parts[1];
//   let arr2 = props.course.parts[2];

//   return (
//     <div>
//       <Part name={arr0.name} exercises={arr0.exercises} />
//       <Part name={arr1.name} exercises={arr1.exercises} />
//       <Part name={arr2.name} exercises={arr2.exercises} />
//     </div>
//   );
// };
// const Total = (props) => {
//   // const { exercises1, exercises2, exercises3 } = props.parts;
//   let exercises1 = props.course.parts[0].exercises;
//   let exercises2 = props.course.parts[1].exercises;
//   let exercises3 = props.course.parts[2].exercises;

//   const totalExe = exercises1 + exercises2 + exercises3;

//   return <p>Number of exercises {totalExe}</p>;
// };

// const Part = (props) => {
//   return (
//     <p>
//       {props.name} {props.exercises}
//     </p>
//   );
// };

// const App = () => {
//   const course = {
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: 7,
//       },
//       {
//         name: "State of a component",
//         exercises: 14,
//       },
//     ],
//   };

//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total course={course} />
//     </div>
//   );
// };

// export default App;

import Course from "./components/Course";

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
