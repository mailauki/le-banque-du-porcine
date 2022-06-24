import Content from "../components/Content";

function Home({user}) {
  return(
    <div className="Home">
      <Content user={user} />
    </div>
  )
}

export default Home;