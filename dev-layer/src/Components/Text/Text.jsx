import './Text.css'

function Text({style, ...props}) {
    return (
        <h1 className='Text'
            style={style}
        >{props.text}</h1>
    )
}

export default Text