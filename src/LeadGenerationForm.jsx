import React, { useState } from 'react';
import './LeadGenerationForm.css'; // Import the CSS file

const LeadGenerationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    botcheck: false,
  });

  const [resultMessage, setResultMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Check for exactly 10 digits
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email and phone number before submission
    if (!validateEmail(formData.email)) {
      setResultMessage('Please enter a valid Gmail address.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setResultMessage('Please enter a valid mobile number (10 digits).');
      return;
    }

    setIsSubmitting(true);
    setResultMessage('Please wait...');

    // Convert form data to JSON
    const json = JSON.stringify({
      access_key: '8840480a-d3f0-4508-b727-748056fbc1a4',
      ...formData,
    });

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: json,
    })
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (response.status === 200) {
          setResultMessage('Form submitted successfully, Contact Soon!');
        } else {
          console.error(response);
          setResultMessage(jsonResponse.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setResultMessage('Something went wrong!');
      })
      .finally(() => {
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          botcheck: false,
        });
        setTimeout(() => {
          setResultMessage('');
        }, 3000);
      });
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h3>Business Enquiry Form</h3>
        <p>Fill in your details below to get started!</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="access_key" value="8840480a-d3f0-4508-b727-748056fbc1a4" />

        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="name"
            placeholder="Enter your business name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter your business name.</div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="phone"
            placeholder="Enter your mobile number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter a valid mobile number.</div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">Please enter your message.</div>
        </div>

        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {resultMessage && (
        <div id="result">
          {resultMessage}
        </div>
      )}
    </div>
  );
};

export default LeadGenerationForm;
