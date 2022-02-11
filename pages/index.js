const Home = (props) => {
  //const { bridgeData } = props;
  return (
    <>
      <div>Welcome to Hello-Hue!</div>
    </>
  )
}
/*
export const getServerSideProps = async() => {
  const bridgeData = await fetch("http://" + process.env.BRIDGEIP + "/api/" + process.env.BRIDGEUSER + "/lights/1")
    .then(response => response.json());
  return {
    props: {bridgeData: bridgeData},
  };
};
*/
  
export default Home;