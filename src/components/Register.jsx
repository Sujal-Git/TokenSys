import './Register.css'; // Import the provided CSS file for styling
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'


const supabase = createClient("https://zaeoiqkgxndvdracokoy.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZW9pcWtneG5kdmRyYWNva295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MDk3NTAsImV4cCI6MjAyNTQ4NTc1MH0.el3Khqz8XwMi5qfEdEYfZ1eXMmKD2Gh-FQB1TEN1U9k")
function Register() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(18); 
    const [acceptedPolicy, setAcceptedPolicy] = useState(false);

    function generateHexadecimal() {
        let hex = '';
        const characters = '0123456789ABCDEF';
    
        for (let i = 0; i < 15; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            hex += characters[randomIndex];
        }
    
        return hex;
    }
    function calculateDueDate() {
        const currentDate = new Date();
        
        // Add 100 days to the current date
        const dueDate = new Date(currentDate.getTime() + (100 * 24 * 60 * 60 * 1000)); // 100 days in milliseconds
        
        const year = dueDate.getFullYear();
        const month = String(dueDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
        const day = String(dueDate.getDate()).padStart(2, '0');
        
        return new Date(`${year}-${month}-${day}`);
    }
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('Tokens')
                .insert([{ 'username': username, 'token': generateHexadecimal(), 'duedate': calculateDueDate() }]);
            
            if (error) {
                console.error('Error inserting user:', error.message);
                alert('An error occurred while registering. Please try again later.');
            } else {
                console.log('User successfully registered:', data);
                alert('User successfully registered.');
            }
        } catch (error) {
            console.error('Error inserting user:', error.message);
            alert('An unexpected error occurred. Please try again later.');
        }
    };
    

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Enter Your Name....'
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder='Enter Your Username....'
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Enter Your Password....'
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Enter Your Email....'
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="range"
                        min="18"
                        max="100"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="age-slider"
                    />
                    <span>{age} years old</span>
                </div>
                <div className="form-group">
                    <input
                        type="checkbox"
                        checked={acceptedPolicy}
                        onChange={(e) => setAcceptedPolicy(e.target.checked)}
                        className="policy-checkbox"
                    />
                    <label htmlFor="policy-checkbox">I accept the privacy policy</label>
                </div>
                <div className="btnwrap">
                    <button type="submit"  className="btn">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
