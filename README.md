###

**Backend Authentication and Role-Based Authorization System**

This project implements a secure login and registration system with token-based authentication using cookies. It also includes middleware for user authentication and role-based access control.

##

Features :

1. User Registration: Allows users to register with essential details.

2. User Login: Authenticates users and generates a secure token stored in an httpOnly cookie.

3. Token-Based Authentication: Verifies the user's identity using the token in cookies.
4. Middleware: Authentication Middleware: Ensures routes are accessible only to logged-in users.
5. Authorization Middleware: Restricts access to certain routes for admin users only.

##
**Middleware Details**

- Authentication Middleware:
  Verifies the presence of a valid token in the cookie.Denies access if the token is missing or invalid.

- Authorization Middleware:
  Checks the user's role (e.g., admin).
  Restricts access to specific routes for non-admin users.

##

**Workflow**

_Registration_:
Users provide necessary information to register.
Data is stored securely in the database.

_Login_:
Users authenticate with their credentials.
A secure token is generated and stored in an httpOnly cookie.

_Accessing Protected Routes_:
The Authentication Middleware ensures only logged-in users can access protected routes.
The Authorization Middleware ensures only admin users can access admin routes.

**Security Practices
Secure Cookies**:

Tokens are stored in httpOnly cookies to prevent XSS attacks.
JWT with Expiry: Tokens are signed with a secret key and have an expiration time.
Error Handling: Proper error messages are sent for unauthorized access or invalid tokens.
HTTPS: Ensure secure communication in production.
