import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer"; // Importing setFilter action creator

// const Filter = () => {
//   const dispatch = useDispatch();

//   const handleChange = (event) => {
//     dispatch(filterChange(event.target.value));
//   };

//   const style = {
//     marginBottom: 10,
//   };

//   return (
//     <div style={style}>
//       filter <input onChange={handleChange} />
//     </div>
//   );
// };

// export default Filter;

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue)); // Dispatching the action with the filter value
  };

  return (
    <div>
      Filter: <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
