/* eslint-disable react/prop-types */
const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Parts = (props) => {
  //   const total = props.course.reduce((val) => console.log(val.exercises), 0);
  const total = props.course.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  );
  return (
    // <>
    //   <h4>{props.course[0].name}</h4>
    //   <h4>{props.course[1].name}</h4>
    //   <h4>{props.course[2].name}</h4>
    // </>
    <>
      {props.course.map((part) => (
        <h4 key={part.id}>
          {part.name} {part.exercises}
        </h4>
      ))}
      <h4>total of {total} exercises</h4>
    </>
  );
};

const Content = (props) => {
  return <Parts course={props.course} />;
};

function Course({ course }) {
  console.log(course);
  return (
    <div>
      <Header name={course.name} />
      <Content course={course.parts} />
    </div>
  );
}

export default Course;
