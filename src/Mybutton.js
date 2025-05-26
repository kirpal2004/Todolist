function Mybutton(props) {
       
       const shoot=()=>{
              alert("Great button");
       }
    return (
        <button onClick={shoot}>I am {props.button} button</button>
        
    );
}
export default Mybutton;