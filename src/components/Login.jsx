import './Login.css'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'


const supabase = createClient("https://zaeoiqkgxndvdracokoy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZW9pcWtneG5kdmRyYWNva295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MDk3NTAsImV4cCI6MjAyNTQ4NTc1MH0.el3Khqz8XwMi5qfEdEYfZ1eXMmKD2Gh-FQB1TEN1U9k")
function Login(){
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const { data } = await supabase.from('Tokens').select('*')
        setUsers(data)
    }       

    const checkExpiry = (user) => {
        const currentDate = new Date();
        const dateParts = user.duedate.split(','); // Split the date string into parts
        // Month in JavaScript Date object is zero-based, so we need to subtract 1 from the month part
        const expiryDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        return expiryDate > currentDate;
    }
    const handleLogin = async (e) => {
        const date = new Date()
        const finaldate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        e.preventDefault();
        const { data } = await supabase.from('Tokens').select('*').eq('username', username).eq('token', password)
        if (data.length > 0) {
            if (checkExpiry(data[0])) {
                alert(`${data[0].username} Logging....`)
            }
            else {
                alert(`Error!! ${data[0].username}: your Token Is expired:`)
                location.reload()
            }
        }
        else {
            alert('Error......')
            location.reload()
        }
    };
    
 

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            required
                            placeholder='Enter Your Username....'
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Enter Your Token....'
                            className="form-control"
                        />
                    </div>
                    <div className="btnwrap">
                    <button type="submit" className="btn" onClick={handleLogin}>Login</button>
                    </div>
                   <br></br>
                 <a href='/register'>  Dont Have Account? Register Here.</a>
                </form>

            </div>
        </>
    )

}
export default Login