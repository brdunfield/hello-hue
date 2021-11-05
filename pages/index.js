const Home = (props) => {
  const { bridgeData } = props;
  return (
    <>
      <div>Welcome to Hello-Hue!</div>
      <div>{Object.keys(bridgeData)}</div>
    </>
  )
}

export const getServerSideProps = async() => {
  const bridgeData = await fetch("http://" + process.env.BRIDGEIP + "/api/" + process.env.BRIDGEUSER)
    .then(response => response.json());
  return {
    props: {bridgeData: bridgeData},
  };
};
  
export default Home;