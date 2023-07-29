import { useState } from "react"

export default function LoginForm({onSubmit}) {
    const [user, setUser] = useState({emailAddress: "", password: ""})
  
    const handleSubmit = (e) => {
      e.preventDefault()
      onSubmit(user)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={user.emailAddress}
          onChange={(e) => setUser((prev) => ({...prev, emailAddress: e.target.value}))}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}
        />
        <button type="submit">Login</button>
      </form>
    )
}
