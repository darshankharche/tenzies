

export default function Card(props){

    return(
        <div className="card" id={`card${props.id}`} onClick={()=>props.handleClick(props.id,props.number)} >{props.number}</div>
    )
}