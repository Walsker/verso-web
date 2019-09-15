import React, {useState} from 'react'
import {ReactMic} from 'react-mic';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMicrophone} from '@fortawesome/free-solid-svg-icons'
import styles from './styles.module.css';

const Button = ({title, action}) => (
  <div className={styles.button} onClick={action}>
    {title}
  </div>
)

function onData(recordedBlob) {
  console.log('chunk of real-time data is: ', recordedBlob);
}

const MicButton = ({toggle, isRecording}) => {
  return (
    <div id={styles.micButton} onClick={() => toggle(!isRecording)} style={{color: isRecording ? 'red' : 'inherit'}}>
      <FontAwesomeIcon icon={faMicrophone} size='10x'/>
    </div>
    )
  }

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

async function saveAudio(audio) {
  console.log('collected audio: ', audio);

  const formData = new FormData();
  formData.append('dialog', audio.blob, 'sample.wav');

  const response = await fetch('http://localhost:3000/verso', {
    method: 'POST',
    // headers: {
    //   'Content-type': 'audio/vnd.wave'
    // },
    body: formData
  })

  console.log('RESPONSE: ', response);
}

const EntryPage = () => {
  const [isRecording, toggle] = useState(false);

  return (
    <div id={styles.container}>
      <ReactMic
        className={styles.soundWave}
        record={isRecording}         // defaults -> false.  Set to true to begin recording
        // onData={onData}        // callback to execute when chunk of audio data is available
        onStop={saveAudio}
        strokeColor='#FF0000'     // sound wave color
        backgroundColor='#000000'// background color
        mimeType='audio/wav'
      />
      <MicButton toggle={toggle} isRecording={isRecording}/>
    </div>
  )
}
export default EntryPage;