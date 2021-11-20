import {LightList} from "../components/LightList";

const LightPage = (props) => {
  const { groups } = props;
  return (
    <>
      <LightList lights={groups}></LightList>
    </>
  )
};

export const getServerSideProps = async() => {
  const bridgeData = await fetch("http://" + process.env.BRIDGEIP + "/api/" + process.env.BRIDGEUSER + "/groups")
    .then(response => response.json());
  console.log(bridgeData)
  return {
    props: {groups: bridgeData},
  };
};

export default LightPage;