const Authors = (props) => {
  if (!props.show) {
    return null
  }
  if (!props.authors) {
    return null
  }


  //console.log('show', props.show)
  //console.log('param', props.param)
  //console.log('authors', authors)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {props.authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
