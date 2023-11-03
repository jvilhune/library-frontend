import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select';

import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const BornForm = ({ notifyCall, show, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS },  { query: ALL_AUTHORS } ],
    onError: (error) => {
      //const messages = error.graphQLErrors.map(e => e.message).join('\n')
      //setError(messages)
      notifyCall(error.message, 'error')
    }
  })

  const options = authors.map(a => { return { 'label': a.name, 'value': a.id } })

  if (!show) {
    return null
  }
  const addborntoken = localStorage.getItem('book-user-token')
  //console.log('addborntoken', addborntoken)

  const submit = async (event) => {
    event.preventDefault()

    const setBornTo = Number(born)

    //editAuthor({ variables: { name, setBornTo } })

    editAuthor({
      variables: {
        name: selectedOption.label,
        setBornTo: setBornTo,
      }
    })

    notifyCall(`The born of ${selectedOption.label} is edited to ${setBornTo}`)

    /*
    console.log('options', options)
    console.log('authors', authors)
    console.log('selectedOption.label', selectedOption.label)
    console.log('born', born)
    */

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div style={{width: '200px'}}>
          <Select onChange={setSelectedOption} options={options} />
        </div>
        <div>
          born <input
            value={born || ''}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default BornForm


/*

<div style={{width: '300px', height: '20px', fontSize: '12px', padding: '1px', top: '1px', textAlign: 'left'}}>

textAlign: 'left',
width: 'auto',


<div>
  name <input
    value={name}
    onChange={({ target }) => setName(target.value)}
  />
</div>

->

<Select onChange={setSelectedOption} options={options} />

react Warning: A component is changing an uncontrolled input to be controlled.
This is likely caused by the value changing from undefined to a defined value,
which should not happen. Decide between using a controlled or uncontrolled input
element for the lifetime of the component
->
value={born || ''}
*/