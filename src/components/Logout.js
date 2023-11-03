
const Logout = ({ logout, token }) => {
  //console.log('FROM Logout COMPONENT token', token)
  return (
        <button onClick={() => { logout() }}>logout</button>
  )
}

export default Logout