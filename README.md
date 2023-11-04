Description:
This project contains a simple registration form built using React and Next.js. The form allows users to register with an email and password, performing client-side validation to ensure password criteria are met.

Installation:
To run the project locally, follow these steps:

Clone the repository:

bash
Copy code
git clone <repository-url>
Install dependencies:

Copy code
npm install
Start the development server:

arduino
Copy code
npm run dev
The project will be accessible at http://localhost:3000.

Usage:

Email Field:
Enter a valid email address in the email field.


Password Field:
Password must contain:
At least 8 characters, 
1 or more lowercase letters,
1 or more uppercase letters,
1 or more decimal characters,
1 or more special characters: !@#$%^&*(),.?":{}|<>

Password Criteria:
Password criteria are displayed below the password input field.
Green checkmarks indicate that a criterion is met.
Red crosses indicate that a criterion is not met.

Submit Button:
The "Submit" button is disabled until all password criteria are met.

Error Handling:
If the email field is empty, an error message will be displayed: "Email is required."
If a user with the provided email already exists, an error message will be displayed: "User already exists."

Form Submission:
Upon successful form submission, the form will be reset, and the user will be redirected to the homepage (/).

Technologies Used:
React: A JavaScript library for building user interfaces.
Next.js: A React framework that enables server-side rendering, static site generation, and routing.
React Icons: A library for easily adding popular icon sets to React projects.
Tailwind CSS: Open source CSS framework.

Author
Tugba Dogan Webb
