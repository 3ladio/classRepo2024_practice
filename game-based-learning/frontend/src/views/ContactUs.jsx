import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import contactImage from "../assets/contactImage.jpg";
import { Footer, Navigation } from "../components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack columns vertically on smaller screens */
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  animation: ${fadeInUp} 0.5s ease-out;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
`;

const Row = styled.div`
  position: relative;
  margin-bottom: 30px;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 10px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: 0;
    left: 10px;
    font-size: 12px;
    color: #333;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 20px 10px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: 0;
    left: 10px;
    font-size: 12px;
    color: #333;
  }
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #45a049;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none; /* Hide on smaller screens */
  }
`;

const Image = styled.img`
  width: 600px;
  max-width: 100%;
  height: 500px;
  display: block;

  @media (max-width: 768px) {
    display: none; /* Hide on smaller screens */
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
    padding: 5px 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  height: 100px;
  resize: vertical;
`;

const Error = styled.span`
  color: red;
  font-size: 14px;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const [popupVisible, setPopupVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const newErrors = { ...errors, [name]: "" };
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();
      const time = currentDate.toLocaleTimeString();

      const emailData = [
        {
          recipient: "legendswork90@gmail.com",
          text: `Hi LT Trainer,\n\nPlease be aware that ${formData.fullName} has contacted you.\nDetails:\n     Name: ${formData.fullName}\n     Email: ${formData.email}\n     Date: ${date}\n     Time: ${time}\n     Message: ${formData.message}\n\nBest regards,\nLT Trainer`,
        },
        {
          recipient: formData.email,
          text: `Hi ${formData.fullName},\n\nThank you for contacting us. Here is a confirmation of your message:\nDetails:\n     Name: ${formData.fullName}\n     Email: ${formData.email}\n     Date: ${date}\n     Time: ${time}\n     Message: ${formData.message}\n\nWe will get back to you shortly.\n\nBest regards,\nLT Trainer`,
        },
      ];

      try {
        const response = await axios.post(
          "http://localhost:5000/api/sendEmail",
          { emails: emailData }
        );
        console.log("Emails sent successfully:", response.data);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
        }, 3000);
      } catch (error) {
        console.error("Error sending emails:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Container>
        <FormContainer>
          <h2>Contact Us</h2>
          {popupVisible && <Popup>Email sent successfully!</Popup>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Full Name:</Label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <Error>{errors.fullName}</Error>}
            </FormGroup>
            <FormGroup>
              <Label>Email:</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <Error>{errors.email}</Error>}
            </FormGroup>
            <FormGroup>
              <Label>Message:</Label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <Error>{errors.message}</Error>}
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </FormContainer>
        <ImageContainer>
          <Image src={contactImage} alt="Contact Us" />
        </ImageContainer>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUs;
