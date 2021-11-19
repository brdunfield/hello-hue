import {Light} from "./Light";

export const LightList = (props) => {
  const {lights} = props;


  const lightList = Object.keys(lights).map((key) => {
    return lights[key];
  });

  const lightElements = lightList.map((light) => {
    //console.log(light);
    return (
      <Light key={lightList.indexOf(light)} name={light.name} state={light.state} id={lightList.indexOf(light) + 1}></Light>
    )
  });

  // TODO if any lights are ON, state of  "All Lights" is on and vice versa

  return (
    <>
      <h2>Lights</h2>
      <div>
        <ul className="p-4">
          <Light key="all" name="all">All Lights</Light>
          {lightElements}
        </ul>      
      </div>
    </>
  )
}

export default LightList;