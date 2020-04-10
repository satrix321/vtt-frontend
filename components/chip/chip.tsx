import './chip.scss'

const Chip: React.FunctionComponent = (props) => {
  return (
    <div className="chip">
      {props.children}
    </div>
  )
}

export default Chip