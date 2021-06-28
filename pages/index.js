import {useState} from 'react'
import {
  Container,
  Form,
  Message,
} from 'semantic-ui-react'
import style from '../styles/index.module.css'

export default function Home() {
  const [csv, setCSV] = useState(
`"Id","FullName"
"1","Marlon Godfray"
"2","Daisey Brizell"
"3","Barbabra Kleinsmuntz"`
  )
  const [message, setMessage] = useState({
    warning: false,
    value: ''
  })

  const handleClick = (event, data) => {
    if (csv === '') {
      setMessage({
        warning: true,
        value: 'CSV形式で入力してください。'
      })
    } else {
      setMessage({
        warning: false,
        value: convertCSV2Json()
      })
    }
  }

  const convertCSV2Json = () => {
    const tempArray = csv.split('\n')
    const csvArray = []
    let json = {}
    const jsonArray = []

    const keys = tempArray[0].split(',')

    for (let i=1; i<tempArray.length; i++) {
      csvArray[i-1] = tempArray[i].split(',')

      for (let j=0; j<keys.length; j++) {
        json[keys[j].replace(/[\"]/g, "")] = csvArray[i-1][j].replace(/[\"]/g, "")
      }

      jsonArray[i-1] = json
      json = {}
    }

    console.log(JSON.stringify(jsonArray, null, '  '))

    return JSON.stringify(jsonArray, null, '  ')
  }

  return (
    <div>
      <Container>
        <Form>
          <Form.TextArea 
            rows='5'
            onChange={(event) => setCSV(event.target.value)}
            value={csv}
          />
          <Form.Button onClick={handleClick}>Convert to JSON</Form.Button>
        </Form>
        <Message
          className={style.wrap}
          warning={message.warning}
          hidden={message.value ? false : true}
        >
          {message.value}
        </Message>
      </Container>
    </div>
  )
}