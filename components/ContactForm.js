import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// TODO: Email and Message Input Errors don't work
// TODO: Clicking on submit button doesn't activate alert

export default function ContactForm() {
  // https://dev.to/alecgrey/controlled-forms-with-front-and-backend-validations-using-react-bootstrap-5a2

  // The form object will hold a key-value pair for each of our form fields, and the errors object will hold a key-value pair for each error that we come across on form submission.
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [formIsValidated, setFormIsValidated] = useState(false);

  // This will update our state to keep all the current form values, then add the newest form value to the right key location. Then add newest form value to the right key location. -> Add onChange function on every input field
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  // Using these cases, we're going to create a function that checks for them, then constructs an errors object with error messages:
  const findFormErrors = () => {
    const { firstName, lastName, email, message } = form;

    const newErrors = {};

    if (!firstName || firstName === '') {
      newErrors.firstName = 'Cannot be blank';
    } else if (firstName.length > 40) {
      newErrors.firstName = 'First name is too long';
    }

    if (!lastName || lastName === '') {
      newErrors.lastName = 'Cannot be blank';
    } else if (lastName.length > 40) {
      newErrors.lastName = 'Last name is too long';
    }

    if (!email || email === '') {
      newErrors.email = 'Cannot be blank';
    } else if (lastName.length > 50) {
      newErrors.email = 'Email is too long';
    }

    if (!message || message === '') {
      newErrors.email = 'Cannot be blank';
    }

    return newErrors;
  };

  // 1. Prevent default action for a form using e.preventDefault()
  // 2. Check our form for errors, using our new function
  // 3. If we receive errors, update our state accordingly, otherwise proceed with form submission!
  // now to handle submission:

  function handleSubmit(e) {
    e.preventDefault();
    // get our new errors
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      alert('Thank you for your feedback');
      setFormIsValidated(true);
    }
  }

  return (
    <div>
      <h3>Contact us</h3>
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            data-cy="contactt-form-firstName"
            isInvalid={!!errors.firstName}
            onChange={(e) => setField('firstName', e.target.value)}
            placeholder="Karl"
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            data-cy="contact-form-lastName"
            isInvalid={!!errors.lastName}
            onChange={(e) => setField('lastName', e.target.value)}
            placeholder="Karlson"
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email adress</Form.Label>
          <Form.Control
            data-cy="contact-form-email"
            isInvalid={!!errors.email}
            onChange={(e) => setField('email', e.target.value)}
            type="email"
            placeholder="karl@karlson.com"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            data-cy="contact-form-email"
            isInvalid={!!errors.message}
            onChange={(e) => setField('email', e.target.value)}
            placeholder="Your Message"
          />
          <Form.Control.Feedback type="invalid">
            {errors.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          data-cy="checkout-form-submit"
          onClick={handleSubmit}
          type="submit"
        >
          Send Message
        </Button>
      </Form>
    </div>
  );
}
