import {Light} from "./Light";

export const LightList = (props) => {
  const {lights} = props;


  const lightList = Object.keys(lights).map((key) => {
    return lights[key];
  });

  const lightElements = lightList.map((light) => {
    console.log(light);
    return (
      <Light key={lightList.indexOf(light)} name={light.name}></Light>
    )
  })

  return (
    <>
      <h2>Lights</h2>
      <div>{lightElements}</div>
    </>
  )
}

export default LightList;