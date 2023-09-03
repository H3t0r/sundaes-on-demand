interface Props {
  imagePath: string
  name: string
}

function ScoopOption({imagePath, name}: Props) {
  return (
    <div>
      <img alt={`${name} scoop`} src={`http://localhost:3030/${imagePath}`} />
    </div>
  )
}

export default ScoopOption
