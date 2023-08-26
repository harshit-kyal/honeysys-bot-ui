import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Splash from "../Splash";
import { BrowserRouter } from "react-router-dom";

const SplashComponent = () => {
    render(
        <BrowserRouter>
            <Splash />
        </BrowserRouter>
    )
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use actual react-router-dom functions
    useNavigate: jest.fn(),
}));

describe('SplashComponent', () => {

    // Tests that the Splash component renders without crashing
    it('should render without crashing', () => {
        render(<SplashComponent />);
    });

    // Tests that the Splash component displays the logo, tagline, and images
    it('should display logo, tagline, and images', () => {
        render(<SplashComponent />);
        expect(screen.getByAltText('logo')).toBeInTheDocument();
        expect(screen.getByText('Introducing the cutting-edge Bot Powered Ecommerce Platform – the next evolution in online shopping!')).toBeInTheDocument();
        expect(screen.getByAltText('landingimage')).toBeInTheDocument();
    });

    // Tests that clicking the "Get Started" button navigates to the login page
    it('should navigate to login page when "Get Started" button is clicked', () => {
        const navigate = jest.fn(); // Create a mock function for navigation
        require('react-router-dom').useNavigate.mockReturnValue(navigate)
        render(<SplashComponent />);
        userEvent.click(screen.getByText('Get Started'));
        expect(navigate).toHaveBeenCalledWith('/login');
    });

    // Tests that the logo and images have the correct dimensions
    it('should have correct dimensions for logo and images', () => {
        render(<SplashComponent />);
        const logo = screen.getByAltText('logo');
        const landingImage = screen.getByAltText('landingimage');
        expect(logo).toHaveAttribute('height', '250');
        expect(logo).toHaveAttribute('width', '250');
        expect(landingImage).toHaveAttribute('height', '300');
        expect(landingImage).toHaveAttribute('width', '300');
    });
})