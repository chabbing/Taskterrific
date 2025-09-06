// Taskterrific - JavaScript for Task Management System

// Global Variables
let tasks = [];
let currentUser = null;
let editingTaskId = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application based on current page
function initializeApp() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeLogin();
            break;
        case 'signup.html':
            initializeSignup();
            break;
        case 'dashboard.html':
            initializeDashboard();
            break;
        case 'my-tasks.html':
            initializeTasks();
            break;
        case 'profile.html':
            initializeProfile();
            break;
    }
    
    // Load saved data
    loadUserData();
    loadTasks();
}

// Login Page Functions
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login process
    showLoading(true);
    
    setTimeout(() => {
        // For demo purposes, accept any email/password
        currentUser = {
            email: email,
            name: 'Chabby Arayata',
            avatar: 'chabby.jpg'
        };
        
        saveUserData();
        showLoading(false);
        showMessage('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 1000);
}

// Signup Page Functions
function initializeSignup() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate password
    if (!validatePasswordRequirements(data.password)) {
        showMessage('Password does not meet requirements', 'error');
        return;
    }
    
    // Check password confirmation
    if (data.password !== data.confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Check terms agreement
    if (!data.terms) {
        showMessage('Please agree to the terms and conditions', 'error');
        return;
    }
    
    showLoading(true);
    
    setTimeout(() => {
        currentUser = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            avatar: 'chabby.jpg'
        };
        
        saveUserData();
        showLoading(false);
        showMessage('Account created successfully! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 1000);
}

// Password Validation
function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordInput = document.getElementById('password');
    const requirements = {
        length: password.length >= 8,
        capital: /[A-Z]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    // Update requirement indicators (hidden but still functional)
    updateRequirement('length-req', requirements.length);
    updateRequirement('capital-req', requirements.capital);
    updateRequirement('symbol-req', requirements.symbol);
    
    // Add green border effect when all requirements are met
    const allValid = Object.values(requirements).every(req => req);
    if (allValid) {
        passwordInput.classList.add('valid');
    } else {
        passwordInput.classList.remove('valid');
    }
    
    // Also validate confirm password when main password changes
    validateConfirmPassword();
    
    return allValid;
}

function validatePasswordRequirements(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
}

function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Check if passwords match and confirm password is not empty
    if (confirmPassword && password === confirmPassword) {
        confirmPasswordInput.classList.add('valid');
    } else {
        confirmPasswordInput.classList.remove('valid');
    }
}

function updateRequirement(id, isValid) {
    const element = document.getElementById(id);
    if (element) {
        const icon = element.querySelector('i');
        if (isValid) {
            element.classList.add('valid');
            icon.className = 'fas fa-check';
        } else {
            element.classList.remove('valid');
            icon.className = 'fas fa-times';
        }
    }
}

// Dashboard Functions
function initializeDashboard() {
    updateUserInfo();
    updateTaskStats();
    setupTaskInteractions();
}

function updateUserInfo() {
    const userName = document.querySelector('.main-header h1');
    if (userName && currentUser) {
        userName.textContent = `Welcome back, ${currentUser.name.split(' ')[0]}!`;
    }
}

function updateTaskStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const overdueTasks = tasks.filter(task => 
        !task.completed && new Date(task.dueDate) < new Date()
    ).length;
    
    // Update stat cards
    updateStatCard(0, totalTasks, 'Total Tasks');
    updateStatCard(1, completedTasks, 'Completed');
    updateStatCard(2, pendingTasks, 'In Progress');
    updateStatCard(3, overdueTasks, 'Overdue');
}

function updateStatCard(index, value, label) {
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards[index]) {
        const numberElement = statCards[index].querySelector('.stat-content h3');
        const labelElement = statCards[index].querySelector('.stat-content p');
        
        if (numberElement) numberElement.textContent = value;
        if (labelElement) labelElement.textContent = label;
    }
}

function setupTaskInteractions() {
    const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
        });
    });
}

// Tasks Page Functions
function initializeTasks() {
    setupTaskFilters();
    setupSearch();
    loadTasksList();
    setupTaskModal();
}

function setupTaskFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter tasks
            const filter = this.dataset.filter;
            filterTasks(filter);
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterTasksBySearch(searchTerm);
        });
    }
}

function filterTasks(filter) {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        const priority = item.dataset.priority;
        const status = item.dataset.status;
        let show = true;
        
        switch(filter) {
            case 'pending':
                show = status === 'pending';
                break;
            case 'completed':
                show = status === 'completed';
                break;
            case 'high':
                show = priority === 'high';
                break;
            case 'all':
            default:
                show = true;
                break;
        }
        
        item.style.display = show ? 'flex' : 'none';
    });
}

function filterTasksBySearch(searchTerm) {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const show = title.includes(searchTerm) || description.includes(searchTerm);
        
        item.style.display = show ? 'flex' : 'none';
    });
}

function loadTasksList() {
    // This would typically load from a database
    // For demo purposes, we'll use sample data
    if (tasks.length === 0) {
        tasks = [
            {
                id: 1,
                title: 'Complete project proposal',
                description: 'Prepare detailed project proposal for client presentation',
                priority: 'high',
                category: 'work',
                dueDate: new Date().toISOString(),
                completed: false
            },
            {
                id: 2,
                title: 'Review team feedback',
                description: 'Go through feedback from team members and implement changes',
                priority: 'medium',
                category: 'review',
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                completed: false
            },
            {
                id: 3,
                title: 'Update documentation',
                description: 'Update project documentation with latest changes',
                priority: 'low',
                category: 'documentation',
                dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
                completed: true
            }
        ];
        saveTasks();
    }
    
    renderTasks();
}

function renderTasks() {
    const tasksContainer = document.querySelector('.tasks-container');
    if (!tasksContainer) return;
    
    tasksContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskDiv.dataset.priority = task.priority;
    taskDiv.dataset.status = task.completed ? 'completed' : 'pending';
    
    const dueDate = new Date(task.dueDate);
    const isOverdue = !task.completed && dueDate < new Date();
    
    taskDiv.innerHTML = `
        <div class="task-checkbox">
            <input type="checkbox" id="task${task.id}" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <label for="task${task.id}"></label>
        </div>
        <div class="task-content">
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <div class="task-meta">
                <span class="task-date ${isOverdue ? 'overdue' : ''}">
                    <i class="fas fa-calendar"></i> 
                    ${formatDate(dueDate)}
                </span>
                <span class="task-category">
                    <i class="fas fa-tag"></i> 
                    ${task.category}
                </span>
            </div>
        </div>
        <div class="task-actions">
            <div class="task-priority ${task.priority}">${task.priority}</div>
            <button class="action-btn" onclick="editTask(${task.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return taskDiv;
}

function formatDate(date) {
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays <= 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString();
}

// Task CRUD Operations
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        updateTaskStats();
    }
}

function openAddTaskModal() {
    editingTaskId = null;
    document.getElementById('modalTitle').textContent = 'Add New Task';
    document.getElementById('taskForm').reset();
    document.getElementById('taskModal').classList.add('show');
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        editingTaskId = taskId;
        document.getElementById('modalTitle').textContent = 'Edit Task';
        
        // Populate form with task data
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskCategory').value = task.category;
        
        // Format date for datetime-local input
        const dueDate = new Date(task.dueDate);
        const formattedDate = dueDate.toISOString().slice(0, 16);
        document.getElementById('taskDate').value = formattedDate;
        
        document.getElementById('taskModal').classList.add('show');
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks();
        renderTasks();
        updateTaskStats();
        showMessage('Task deleted successfully', 'success');
    }
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('show');
    editingTaskId = null;
}

function setupTaskModal() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskSubmit);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeTaskModal();
            }
        });
    }
}

function handleTaskSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        category: formData.get('category'),
        dueDate: formData.get('dueDate')
    };
    
    if (editingTaskId) {
        // Update existing task
        const taskIndex = tasks.findIndex(t => t.id === editingTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                ...taskData,
                dueDate: new Date(taskData.dueDate).toISOString()
            };
            showMessage('Task updated successfully', 'success');
        }
    } else {
        // Create new task
        const newTask = {
            id: Date.now(), // Simple ID generation
            ...taskData,
            dueDate: new Date(taskData.dueDate).toISOString(),
            completed: false
        };
        tasks.push(newTask);
        showMessage('Task created successfully', 'success');
    }
    
    saveTasks();
    renderTasks();
    updateTaskStats();
    closeTaskModal();
}

// Profile Page Functions
function initializeProfile() {
    setupProfileForm();
    setupPasswordModal();
    setupToggleSwitches();
}

function setupProfileForm() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const profileData = Object.fromEntries(formData);
    
    // Update user data
    if (currentUser) {
        currentUser = {
            ...currentUser,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            name: `${profileData.firstName} ${profileData.lastName}`,
            phone: profileData.phone,
            bio: profileData.bio
        };
        
        saveUserData();
        showMessage('Profile updated successfully', 'success');
    }
}

function setupPasswordModal() {
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', handlePasswordChange);
    }
    
    // Password validation for change password
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', validateNewPassword);
    }
}

function validateNewPassword() {
    const password = document.getElementById('newPassword').value;
    const requirements = {
        length: password.length >= 8,
        capital: /[A-Z]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    updateRequirement('new-length-req', requirements.length);
    updateRequirement('new-capital-req', requirements.capital);
    updateRequirement('new-symbol-req', requirements.symbol);
    
    return Object.values(requirements).every(req => req);
}

function handlePasswordChange(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmNewPassword');
    
    // Validate new password
    if (!validatePasswordRequirements(newPassword)) {
        showMessage('New password does not meet requirements', 'error');
        return;
    }
    
    // Check password confirmation
    if (newPassword !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Simulate password change
    showMessage('Password changed successfully', 'success');
    closePasswordModal();
}

function openChangePasswordModal() {
    document.getElementById('passwordModal').classList.add('show');
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('show');
    document.getElementById('passwordForm').reset();
}

function setupToggleSwitches() {
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const setting = this.id;
            const isEnabled = this.checked;
            
            // Save setting
            localStorage.setItem(`setting_${setting}`, isEnabled);
            
            // Show feedback
            const settingName = setting.replace(/([A-Z])/g, ' $1').toLowerCase();
            showMessage(`${settingName} ${isEnabled ? 'enabled' : 'disabled'}`, 'success');
        });
        
        // Load saved setting
        const savedSetting = localStorage.getItem(`setting_${toggle.id}`);
        if (savedSetting !== null) {
            toggle.checked = savedSetting === 'true';
        }
    });
}

// Utility Functions
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash toggle-password';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye toggle-password';
    }
}

function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content') || document.querySelector('.login-card') || document.querySelector('.signup-card');
    if (mainContent) {
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

function showLoading(show) {
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        if (show) {
            btn.disabled = true;
            btn.innerHTML = '<div class="loading"></div>';
        } else {
            btn.disabled = false;
            // Restore original content (this is simplified)
            btn.innerHTML = btn.getAttribute('data-original') || btn.innerHTML;
        }
    });
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Data Persistence
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

function loadUserData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

// Page Transitions
function addPageTransitions() {
    // Add smooth transitions between pages
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Add fade out effect
            document.body.style.opacity = '0.8';
            document.body.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 200);
        });
    });
}

// Initialize page transitions
document.addEventListener('DOMContentLoaded', addPageTransitions);

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate stat cards on dashboard
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
    
    // Add hover effects to task items
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .task-item {
        transition: all 0.3s ease;
    }
    
    .overdue {
        color: var(--danger) !important;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
