import React from 'react'
import styles from './styles.module.css';

const Button = ({title, action}) => (
  <div className={styles.button} onClick={action}>
    {title}
  </div>
)

const fetchData = async () => {
  console.log('start request')
  const response = await fetch('http://localhost:8888/sentiment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text: 'Hey I\'m feeling great'})
  })

  if (response.ok) {
    let json = await response.json()
    console.log('ok!', json)
  } else {
    console.log('error');
  }
}

const EntryPage = () => (
  <div id={styles.container}>
    Hello world
    <Button title='Fetch' action={fetchData}/>
  </div>
)

export default EntryPage;