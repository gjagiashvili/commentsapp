const Reply = (props) => {

  return(
    <div className="reply-container">
      <img src="/images/avatars/image-juliusomo.png" alt="" />
      <input onChange={(e)=>props.setInputValue(e.target.value)} type="text" placeholder="Add a comment..." />
      {props.buttonTxt === 'send' && <button className='button-send' onClick={()=>{props.addComment()}}>{props.buttonTxt}</button>}
      {props.buttonTxt === 'reply' && <button className='button-send' onClick={()=>{props.addReply(props.index, props.action)}}>{props.buttonTxt}</button>}
    </div>
  )
}

export default Reply