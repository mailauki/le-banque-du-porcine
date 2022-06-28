import Content from "../components/Content";

function Home({user, defaultBalance}) {
  return(
    <div className="Home">
      {user ? <Content user={user} defaultBalance={defaultBalance} /> : <></>}
    </div>
  )
}

export default Home;