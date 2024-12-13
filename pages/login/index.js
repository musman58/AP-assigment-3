

import { useState, FormEvent, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../components/authcontext/authcontext'


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
const{login}=useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      // Here you would typically make an API call to your authentication endpoint
      console.log('Logging in with:', email, password)
      await login(email,password);
      // Simulate API call delay
     // await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirect to dashboard on successful login
     // router.push('/')
    } catch (err) {
      setError('Failed to log in. Please try again.')
    }
  }

  return (
    <div className="container-fluid vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ borderRadius: '0.25rem' }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ borderRadius: '0.25rem' }}
                  />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  style={{ 
                    backgroundColor: '#007bff', 
                    borderColor: '#007bff',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

