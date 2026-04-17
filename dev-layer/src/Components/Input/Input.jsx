import './Input.css'

function Input({style, onChange,...props}) {
    return (
        <input type="text" className='Input' style={style}
            id={props.id}
            placeholder={props.placeholder} onChange={onChange}
        />
    )
}

export default Input