import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/context/AuthContext'

export default function AuthForm() {
  const {
    registerUser,
    signIn,
    forgotPassword,
  } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === '/login'

  const handleSubmit = (e) => {
    e.preventDefault()
    const username = document.getElementById('username')?.value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value.trim()

    if (username === '' || email === '' || password === '') return alert('Please fill in all fields')

    if (isLogin) {
      try {
        signIn(email, password)
        navigate('/links')
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        registerUser(email, password, username)
        navigate('/links')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='max-w-sm w-full h-full mt-36 md:mt-44 p-2 md:p-0 font-display divide-y divide-neutral-300 dark:divide-neutral-700'>
      <div >
        <h1 className='mt-10 text-xl font-semibold text-neutral-800 dark:text-neutral-200'>{isLogin ? 'Login' : 'Register'}</h1>
        <p className='text-sm mt-2 text-neutral-600 dark:text-neutral-500'>
          {isLogin ? "Don't have an account?" : 'Have an account?'} <a className='underline underline-offset-2' href={isLogin ? "/register" : "/login"}>{isLogin ? 'Register' : 'Login'}</a>
        </p>
      </div>
      <form className='mt-6' onSubmit={handleSubmit}>
        <label className="block mt-4" htmlFor='email'>
          <span className="text-neutral-500 text-sm font-medium">Email</span>
          <input
            autoComplete='off'
            id='email'
            type='email'
            placeholder='john@doe.com'
            className='font-display mt-2 w-full border border-neutral-300 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-200 p-2 pl-4 pr-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500  bg-neutral-100 dark:bg-neutral-900 sm:text-sm'
          />
        </label>
        {!isLogin &&
          <label className="block mt-2" htmlFor="username">
            <span className="text-neutral-500 text-sm font-medium">Username</span>
            <input
              autoComplete='off'
              id='username'
              type="text"
              placeholder='Username'
              className='font-display mt-2 w-full border border-neutral-300 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-200 p-2 pl-4 pr-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500  bg-neutral-100 dark:bg-neutral-900 sm:text-sm'
            />
          </label>}
        <label className="block mt-2" htmlFor="password">
          <span className="text-neutral-500 text-sm font-medium">Password</span>
          <input
            autoComplete='off'
            id='password'
            type='password'
            placeholder='●●●●●●●●●●●●'
            className='font-display mt-2 w-full border border-neutral-300 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-200 p-2 pl-4 pr-3 text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-500  bg-neutral-100 dark:bg-neutral-900 sm:text-sm'
          />
        </label>
        <button
          className='p-2 bg-neutral-200 dark:bg-neutral-800 w-full mt-4 font-medium text-sm rounded-md text-neutral-400 dark:text-neutral-400 hover:text-neutral-200 hover:bg-neutral-600 transition-colors'>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {isLogin && <div className='mt-8'>
        <p className='text-sm mt-6 text-neutral-500 dark:text-neutral-400'>
          Forgot your password? <button
            className='underline underline-offset-2' onClick={() => forgotPassword()}>Reset it</button>
        </p>
      </div>}
    </div>
  )
}
