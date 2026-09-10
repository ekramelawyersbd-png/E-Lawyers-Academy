# E-Lawyers Academy - Landing Page Webhook Integration Guide

This guide explains how to connect external landing pages, forms, or funnels to the E-Lawyers Academy CRM using our secure Webhook API.

## API Endpoint Details
- **URL**: `https://[your-app-domain]/api/leads/webhook`
- **Method**: `POST`
- **Content-Type**: `application/json`

## Authentication
The endpoint requires a secret key for validation to prevent unauthorized spam submissions. 
Include the `secret` field in your JSON payload.

## Required Payload Structure

```json
{
  "name": "Student Name",
  "email": "student@email.com",
  "phone": "+8801700000000",
  "course": "Selected Course Name",
  "secret": "ela-test-secret-2026"
}
```

## Integration Examples

### 1. HTML & Vanilla JavaScript (Copy-Paste Ready)
Use this snippet directly in a static HTML page.

```html
<form id="leadCaptureForm">
  <input type="text" id="name" placeholder="Full Name" required />
  <input type="email" id="email" placeholder="Email Address" required />
  <input type="tel" id="phone" placeholder="Phone Number" required />
  <input type="hidden" id="course" value="VAT & Tax Compliance Professional Training" />
  <button type="submit">Enroll Now</button>
</form>

<script>
  document.getElementById('leadCaptureForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const payload = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      course: document.getElementById('course').value,
      secret: "ela-test-secret-2026"
    };

    try {
      const response = await fetch('https://[your-app-domain]/api/leads/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      if (result.success) {
        alert("Success! We will contact you soon.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
</script>
```

### 2. React / Next.js

```javascript
import { useState } from 'react';

export default function LeadForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://[your-app-domain]/api/leads/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          course: 'Corporate Legal Compliance Course',
          secret: 'ela-test-secret-2026'
        })
      });

      if (response.ok) {
        console.log('Lead successfully submitted!');
      }
    } catch (error) {
      console.error('Webhook error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add your standard React input fields here */}
      <button type="submit">Join Waitlist</button>
    </form>
  );
}
```

## Security Best Practices
- **Do not expose production secrets in client-side code** in a real-world scenario. Use an intermediary serverless function (like Next.js API routes or Cloudflare Workers) to attach the secret key before forwarding to the E-Lawyers webhook.
- The system automatically captures `sourceUrl`, `clientIp`, and `userAgent` to help you identify the lead source and filter potential bots. You can view these logs in the **Admin Panel -> Webhook Logs** tab.
