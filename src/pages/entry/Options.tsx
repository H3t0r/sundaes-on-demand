import React from 'react'
import ScoopOption from './ScoopOption'

type Option = {imagePath: string; name: string}

async function getOptions(type: Props['type']): Promise<Option[]> {
  const response = await fetch(`http://localhost:3030/${type}`)

  return response.json()
}

interface Props {
  type: 'scoops' | 'toppings'
}

function Options({type}: Props) {
  const [options, setOptions] = React.useState<Option[]>([])

  React.useEffect(() => {
    getOptions(type)
      .then(response => setOptions(response))
      .catch(error => {
        // TODO: handle error
      })
  }, [type])

  return (
    <>
      {options.map(option => (
        <ScoopOption
          imagePath={option.imagePath}
          key={option.name}
          name={option.name}
        />
      ))}
    </>
  )
}

export default Options
