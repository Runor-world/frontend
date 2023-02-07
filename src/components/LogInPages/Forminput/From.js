import React,{useState} from 'react'
import { SocialIcon } from 'react-social-icons';
import FormInput from './FormInput';
import './from.css'

const From = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
      });
      
      const inputs = [
       
        {
          id: 1,
          name: "email",
          type: "email",
          placeholder: "Email",
          errorMessage: "It should be a valid email address!",
          label: "Email",
          required: true,
        },
      
        {
          id: 2,
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage:
            "Password should be 6-18 characters and include at least one uppercase and number!",
          label: "Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },

      ];
    
      const handleSubmit = (e) => {
        e.preventDefault();
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
    
      console.log(values);
  return (
    <div className='style-form'>
      <form onSubmit={handleSubmit}>
        <h1 className='signup_btn'>SignUp</h1>
        <h1 className='description'>log in to your account</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div className='log_and_socials'>
        <button>LogIn</button>

        <div className='social-icon'>
        <SocialIcon url="https://facebook.com" width='20px' height='20px' />
        <SocialIcon url="https://google.com" />
        </div>
        </div>
      </form>
    </div>
  )
}

export default From