import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

const LoginComponent = () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    )
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual react-router-dom functions
    useNavigate: jest.fn(),
}));

describe('LoginComponent', () => {

       // Tests that the user can enter a valid mobile number and check the TnC, and is able to navigate to the OTP page.
       it('should navigate to OTP page when valid mobile number is entered and TnC is checked', () => {
        // Arrange
        render(<Login />);
        const mobileInput = screen.getByPlaceholderText("Enter your mobile number");
        const tncCheckbox = screen.getByRole("checkbox", { name: /By clicking on “Send Verification Code” you accept our Terms & Conditions and authorize us for your future support and guidance./i });
        const sendVerificationCodeButton = screen.getByRole("button", { name: "Send Verification Code" });
  
        // Act
        fireEvent.change(mobileInput, { target: { value: "1234567890" } });
        fireEvent.click(tncCheckbox);
        fireEvent.click(sendVerificationCodeButton);
  
        // Assert
        expect(screen.getByText("OTP")).toBeInTheDocument();
      });

})