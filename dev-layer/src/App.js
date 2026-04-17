import Button from './Components/Button/Button'
import Background from './Components/Background/Background'
import Input from './Components/Input/Input'; 
import Text from './Components/Text/Text';
import './App.css';
import { useRef, useState } from 'react';

// todo
// 1. Register page
// 2. Backend
 
function App() {
  // states
  const [Page, setPage] = useState('Login')
  const [Loading, setLoading] = useState(null)

  // login func
  const handleLogin = async(registerOrLogin) => {
    // set state
    setLoading(registerOrLogin);
    const passInput = document.getElementById(registerOrLogin + 'PassInput')
    const userInput = document.getElementById(registerOrLogin + 'UserInput')
    
    // if (passInput == '' || userInput == '') {
    //   alert("You have to type something in there buddy!")
    // }
    
    // fetch
    try {
      const response = await fetch('http://localhost:5500/' + registerOrLogin, {
        method : 'POST',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({
          username : userInput.value,
          password : passInput.value
        })
      })
      .then(async (data) => {
        const responseData = await data.json();
        console.log(data.status)
        if (data.status !== 200) {
          alert(responseData.error)
        }
        setLoading(null)
      }).catch((error) => {
        alert(error)
        setLoading(null)
      })
    } catch (error) {
      alert(error)
      setLoading(null)
    }
  }

  const Login = () => (
    <div className="App">
      <Background></Background>
      <div className='Login'>
        <div className='LoginBox'>
          <Text text='DevLayer'
            style={{
              'text-shadow' : '0 2px 8px rgba(255,255,255,0.2)',
              'font-size' : '5rem',
              'letter-spacing' : '-1.5px',
              'margin' : '1rem',
              'margin-top' : '-15rem',
              'text-align' : 'center',
            }}
          ></Text>
          <Text text='The social media for developers. By developers.'
            style={{
              'text-shadow' : '0 1px 4px rgba(255,255,255,0.2)',
              'font-size' : '1.2rem',
              'letter-spacing' : '-0.5px',
              'margin' : '0',
              'margin-top' : '-2rem',
              'text-align' : 'center',
            }}
          ></Text>
          <div className='FormInputs'>
            <Input
              placeholder='Username'
              id='loginUserInput'
              style={{ 
              'padding' : '10px 10px',
              'width' : '95%'
            }}
            ></Input>
            <Input
              placeholder='Password'
              id='loginPassInput'
              style={{ 
              'padding' : '10px 10px',
              'width' : '95%'
            }}
            ></Input>
            <Button text='Login' style={{ 
              'padding' : '10px 150px',
              'width' : '100%',
              'font-weight' : '700',
              'Margin' : '0'
            }} loading={Loading === 'Login'} onClick={() => handleLogin('login')}></Button>
            <span className='SwitchPage'>Don't have an account?
              <span className='SwitchButton' onClick={() => setPage('Register')}> Create one!</span>
            </span>
          </div>
        </div>
      </div> 
    </div>
  )

  const Register = () => (
    <div className="App">
      <Background></Background>
      <div className='Login'>
        <div className='LoginBox'>
          <Text text='DevLayer'
            style={{
              'text-shadow' : '0 2px 8px rgba(255,255,255,0.2)',
              'font-size' : '5rem',
              'letter-spacing' : '-1.5px',
              'margin' : '1rem',
              'margin-top' : '-15rem',
              'text-align' : 'center',
            }}
          ></Text>
          <Text text='Join the best dev community in the world.'
            style={{
              'text-shadow' : '0 1px 4px rgba(255,255,255,0.2)',
              'font-size' : '1.2rem',
              'letter-spacing' : '-0.5px',
              'margin' : '0',
              'margin-top' : '-2rem',
              'text-align' : 'center',
            }}
          ></Text>
          <div className='FormInputs'>
            <Input
              placeholder='Username'
              id='registerUserInput'
              style={{ 
              'padding' : '10px 10px',
              'width' : '95%'
            }}
            ></Input>
            <Input
              placeholder='Password'
              id='registerPassInput'
              style={{ 
              'padding' : '10px 10px',
              'width' : '95%'
            }}
            ></Input>

            {/* loading button useState() */}
            <Button text='Register' style={{ 
              'padding' : '10px 150px',
              'width' : '100%',
              'font-weight' : '700',
              'Margin' : '0'
            }} loading={Loading === 'Register'} onClick={() => handleLogin('register')}></Button>
            <span className='SwitchPage'>Already have an account? 
              <span className='SwitchButton' onClick={() => setPage('Login')}> Log in</span>
            </span>
          </div>
        </div>
      </div> 
    </div>
  )

  return (
    <div className='App'>
      {Page === 'Login' ? <Login /> : <Register />}
    </div>
  )
}

export default App;
