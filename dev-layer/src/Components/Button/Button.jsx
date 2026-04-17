import './Button.css'

function Button({onClick, style, ...props}) {
    return (
        <button className='Button' disabled={props.loading} onClick={onClick}
            style={style}
        >{props.text}</button>
    )
}

export default Button