import {Toggle} from "./Toggle";
export const Light = (props) => {
  const {name, id, state, children} = props;

  return (
    <li className="inline-block m-4 cursor-pointer w-full relative">
      <span className="inline-block w-3/4 relative">{children || name}</span>
      <span>
        <Toggle id={id} active={(state && state.on) ? state.on : false }></Toggle>
      </span>
    </li>
  )
};

export default Light;