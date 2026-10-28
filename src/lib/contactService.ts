/**
 * Contact Form Service
 *
 * Handles contact form submission via Web3Forms (free tier: 250 submissions/month).
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://web3forms.com and get your access key
 * 2. Add to environment variables: VITE_WEB3FORMS_ACCESS_KEY=your-key
 * 3. Optionally add: VITE_CONTACT_EMAIL=your@email.com
 * 
 * If no access key is configured, the form will show a clear error message
 * instead of silently failing.
 */

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  error?: string;
}

/**
 * Validate contact form input
 */
export function validateContactForm(data: ContactFormData): string[] {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (data.name && data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.push('Email is required');
  } else if (!emailRegex.test(data.email)) {
    errors.push('Please enter a valid email address');
  }
  if (data.email && data.email.length > 255) {
    errors.push('Email must be less than 255 characters');
  }

  if (!data.subject) {
    errors.push('Subject is required');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  if (data.message && data.message.length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  return errors;
}

/**
 * Submit contact form via Web3Forms
 */
export async function submitContactForm(
  data: ContactFormData,
  honeypotValue: string,
  submitTimestamp: number
): Promise<ContactFormResult> {
  // Check honeypot (spam bots fill this in)
  if (honeypotValue) {
    // Silently reject spam - don't reveal the honeypot
    return { success: true }; // Return success to not alert the bot
  }

  // Check timestamp (bots submit too fast)
  const timeToSubmit = Date.now() - submitTimestamp;
  if (timeToSubmit < 3000) {
    // Less than 3 seconds = likely a bot
    return { success: false, error: 'Please take your time filling out the form.' };
  }

  // Validate input
  const errors = validateContactForm(data);
  if (errors.length > 0) {
    return { success: false, error: errors.join('. ') };
  }

  // Check if Web3Forms is configured
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return {
      success: false,
      error: 'Contact form is not configured. Please email us directly at hello@mediasmakers.com',
    };
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: `MediasMakers Contact: ${data.subject}`,
        message: data.message.trim(),
        // Honeypot field (Web3Forms built-in)
        botcheck: '',
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: 'Failed to send message. Please try again or email us directly.' 
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: 'Network error. Please check your connection and try again.' 
    };
  }
}
