interface Props {
  imagePath: string
  name: string
}

function ToppingOption({imagePath, name}: Props) {
  return (
    <div>
      <img alt={`${name} topping`} src={`http://localhost:3030/${imagePath}`} />
    </div>
  )
}

export default ToppingOption
