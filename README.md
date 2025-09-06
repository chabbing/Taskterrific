# Taskterrific - Elegant Task Management System

A beautiful and elegant to-do list system with a classy pink design and smooth animations, built with HTML, CSS, and JavaScript.

## Features

### 🎨 Design
- **Elegant Pink Theme**: Sophisticated pink color palette with gradients
- **Smooth Animations**: Beautiful transitions and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with glassmorphism effects

### 🔐 Authentication
- **Secure Login**: Email and password authentication
- **User Registration**: Complete signup process with validation
- **Password Security**: Strong password requirements (8+ chars, 1 capital, 1 symbol)
- **Form Validation**: Real-time validation with visual feedback

### 📋 Task Management
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Task Categories**: Organize tasks by work, personal, review, documentation
- **Priority Levels**: High, Medium, Low priority with color coding
- **Due Dates**: Set and track task deadlines
- **Status Tracking**: Mark tasks as completed or pending
- **Search & Filter**: Find tasks quickly with search and filter options

### 👤 User Profile
- **Profile Management**: Update personal information
- **Avatar Support**: Profile picture integration (Chabby Arayata)
- **Security Settings**: Change password with validation
- **Preferences**: Theme, language, and notification settings
- **Statistics**: Task completion rates and progress tracking

### 📊 Dashboard
- **Overview Statistics**: Total, completed, pending, and overdue tasks
- **Recent Tasks**: Quick view of latest tasks
- **Quick Actions**: Fast access to common functions
- **Notifications**: Visual notification system

## Pages

1. **Login Page** (`index.html`)
   - Email and password login
   - Remember me functionality
   - Forgot password link
   - Link to signup page

2. **Signup Page** (`signup.html`)
   - Complete registration form
   - Password strength validation
   - Terms and conditions agreement
   - Link to login page

3. **Dashboard** (`dashboard.html`)
   - Welcome message with user's name
   - Task statistics overview
   - Recent tasks list
   - Quick action buttons
   - Navigation sidebar

4. **My Tasks** (`my-tasks.html`)
   - Complete task management interface
   - Add, edit, delete tasks
   - Search and filter functionality
   - Priority and category management
   - Due date tracking

5. **Profile** (`profile.html`)
   - User information management
   - Profile picture (Chabby Arayata)
   - Security settings
   - Password change functionality
   - Preferences and notifications

## Technical Features

### Frontend
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript ES6+**: Modern JavaScript features
- **Local Storage**: Data persistence without backend
- **Responsive Design**: Mobile-first approach

### Security
- **Password Validation**: Strong password requirements
- **Input Sanitization**: XSS prevention
- **Form Validation**: Client-side validation
- **Secure Storage**: Local storage with data validation

### Performance
- **Optimized Animations**: Smooth 60fps animations
- **Lazy Loading**: Efficient resource loading
- **Minimal Dependencies**: Lightweight implementation
- **Fast Rendering**: Optimized DOM manipulation

## Getting Started

1. **Open the Application**
   - Start with `index.html` for the login page
   - Or open `dashboard.html` to skip login (for demo)

2. **Login/Signup**
   - Use any email/password for demo login
   - Or create a new account with strong password

3. **Manage Tasks**
   - Navigate to "My Tasks" to manage your tasks
   - Use the "Add Task" button to create new tasks
   - Edit or delete tasks using the action buttons

4. **Customize Profile**
   - Go to "Profile" to update your information
   - Change password and preferences
   - View your task statistics

## File Structure

```
Taskterrific/
├── index.html          # Login page
├── signup.html         # Registration page
├── dashboard.html      # Main dashboard
├── my-tasks.html       # Task management
├── profile.html        # User profile
├── styles.css          # All styling
├── script.js           # All functionality
├── chabby.jpg          # Profile image
└── README.md           # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Colors
The color scheme can be customized by modifying CSS variables in `styles.css`:
```css
:root {
    --primary-pink: #E91E63;
    --light-pink: #F8BBD9;
    --dark-pink: #C2185B;
    /* ... more colors */
}
```

### Animations
Animation timing can be adjusted:
```css
:root {
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

## Features in Detail

### Password Security
- Minimum 8 characters
- At least one uppercase letter
- At least one special character
- Real-time validation with visual feedback

### Task Management
- **Create**: Add new tasks with title, description, priority, category, and due date
- **Read**: View all tasks with filtering and search
- **Update**: Edit existing tasks
- **Delete**: Remove tasks with confirmation

### Responsive Design
- **Desktop**: Full sidebar navigation and multi-column layout
- **Tablet**: Collapsible sidebar and adjusted grid
- **Mobile**: Stacked layout with touch-friendly buttons

### Data Persistence
- All data is stored in browser's local storage
- No backend required for basic functionality
- Data persists between browser sessions

## Future Enhancements

- Backend integration for multi-user support
- Real-time collaboration features
- Advanced reporting and analytics
- Calendar integration
- File attachments for tasks
- Team management features
- API integration for external services

## Support

For any issues or questions about the Taskterrific system, please refer to the code comments or create an issue in the project repository.

---

**Taskterrific** - Your elegant task management solution! ✨
