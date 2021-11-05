import {LightList} from "../components/LightList";

const LightPage = (props) => {
  const { lights } = props;
  return (
    <>
      <LightList lights={lights}></LightList>
    </>
  )
};

export const getServerSideProps = async() => {
  const bridgeData = await fetch("http://" + process.env.BRIDGEIP + "/api/" + process.env.BRIDGEUSER + "/lights")
    .then(response => response.json());
  return {
    props: {lights: bridgeData},
  };
};

export default LightPage;