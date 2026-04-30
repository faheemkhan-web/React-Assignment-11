import { useState } from 'react'

const initialFormData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptedTerms: false
}

function RegistrationForm() {
    const [formData, setFormData] = useState(initialFormData)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const isFormValid = () => {
        const { fullName, email, password, confirmPassword, gender, acceptedTerms } = formData
        return (
            fullName.trim() !== '' &&
            email.trim() !== '' &&
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            gender.trim() !== '' &&
            acceptedTerms &&
            password === confirmPassword
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true)
        if (!isFormValid()) {
            return
        }

        console.log('Registration Data:', formData)
        alert('Registration Successful')
        setFormData(initialFormData)
        setSubmitted(false)
    }

    const passwordMismatch = formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword

    return (
        <>
            <form className="registration-form" onSubmit={handleSubmit} noValidate>
                <label>
                    Full Name
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                    />
                </label>

                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </label>

                <label>
                    Confirm Password
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                </label>

                <label>
                    Gender
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="nonbinary">Non-binary</option>
                        <option value="preferNotToSay">Prefer not to say</option>
                    </select>
                </label>

                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="acceptedTerms"
                        checked={formData.acceptedTerms}
                        onChange={handleChange}
                    />
                    I accept the Terms & Conditions
                </label>

                {passwordMismatch && (
                    <p className="error-text">Passwords do not match.</p>
                )}

                <button type="submit" disabled={!isFormValid()}>
                    Register
                </button>

                {submitted && !isFormValid() && (
                    <p className="error-text">Please complete all fields, accept terms, and make sure passwords match.</p>
                )}
            </form>

            <div className="preview-card">
                <h2>Live Preview</h2>
                <p><strong>Name:</strong> {formData.fullName || '—'}</p>
                <p><strong>Email:</strong> {formData.email || '—'}</p>
                <p><strong>Gender:</strong> {formData.gender ? formData.gender.replace(/([A-Z])/g, ' $1') : '—'}</p>
                <p><strong>Accepted Terms:</strong> {formData.acceptedTerms ? 'Yes' : 'No'}</p>
            </div>
        </>
    )
}

export default RegistrationForm
