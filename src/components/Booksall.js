const Booksall = (props) => {
  if (!props.show) {
    return null
  }

  if (!props.books) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th align ="left">title</th>
            <th align ="left">author</th>
            <th align ="left">published</th>
            <th align ="left">genres</th>
          </tr>
          {props.books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres[0]} {a.genres[1]} {a.genres[2]} {a.genres[3]} {a.genres[4]} {a.genres[5]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Booksall
