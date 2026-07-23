// Landing Page Controls
const planButtons = document.querySelectorAll("[data-plan]");
const selectedPlanInput = document.querySelector("#selectedPlan");
const paymentPlan = document.querySelector("#paymentPlan");
const paymentAmount = document.querySelector("#paymentAmount");

const schoolNameInput = document.querySelector("#customSchoolName");
const logoInput = document.querySelector("#customLogo");
const messageInput = document.querySelector("#customMessage");
const previewLogo = document.querySelector("#previewLogo");
const previewName = document.querySelector("#previewName");
const previewTitle = document.querySelector("#previewTitle");
const previewMessage = document.querySelector("#previewMessage");
const schoolForm = document.querySelector("#schoolForm");
const roleButtons = document.querySelectorAll("[data-role]");
const activeRoleLabel = document.querySelector("#activeRoleLabel");
const loginPreviewBtn = document.querySelector("#loginPreviewBtn");

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    const price = button.dataset.price;

    if (selectedPlanInput) selectedPlanInput.value = `${plan} - ${price}`;
    if (paymentPlan) paymentPlan.textContent = `${plan} Plan`;
    if (paymentAmount) paymentAmount.textContent = price;

    const regSection = document.querySelector("#registration");
    if (regSection) regSection.scrollIntoView({ behavior: "smooth" });
  });
});

function syncPreview() {
  if (!schoolNameInput || !logoInput || !messageInput || !previewLogo) return;
  const schoolName = schoolNameInput.value.trim() || "Your School";
  const logoText = logoInput.value.trim() || "YS";
  const message = messageInput.value.trim() || "Create a modern public website for your school.";

  previewLogo.textContent = logoText.toUpperCase();
  previewName.textContent = schoolName;
  previewTitle.textContent = schoolName;
  previewMessage.textContent = message;

  // Sync to portal dashboard too
  const dashSchool = document.querySelector("#dashboardSchoolName");
  const sidebarMark = document.querySelector(".brand-mark-sidebar");
  if (dashSchool) dashSchool.textContent = schoolName;
  if (sidebarMark) sidebarMark.textContent = logoText.substring(0, 2).toUpperCase();
}

[schoolNameInput, logoInput, messageInput].forEach((field) => {
  if (field) field.addEventListener("input", syncPreview);
});

if (schoolForm) {
  schoolForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const customizeSection = document.querySelector("#customize");
    if (customizeSection) customizeSection.scrollIntoView({ behavior: "smooth" });
  });
}

roleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    roleButtons.forEach((item) => item.closest("article").classList.remove("is-active"));
    button.closest("article").classList.add("is-active");
    if (activeRoleLabel) activeRoleLabel.textContent = button.dataset.role;
  });
});

if (loginPreviewBtn) {
  loginPreviewBtn.addEventListener("click", () => {
    const portalsSection = document.querySelector("#portals");
    if (portalsSection) portalsSection.scrollIntoView({ behavior: "smooth" });
    if (roleButtons.length > 0) roleButtons[0].click();
  });
}

if (roleButtons.length > 0) {
  roleButtons[0].click();
}

syncPreview();

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");
const headerAction = document.querySelector(".header-action");

if (mobileMenuBtn && mainNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("is-open");
    if (headerAction) headerAction.classList.toggle("is-open");
  });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".main-nav a");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (mainNav) mainNav.classList.remove("is-open");
    if (headerAction) headerAction.classList.remove("is-open");
  });
});


/* ==========================================================================
   PORTAL INTERACTIVE LOGIC & STATE
   ========================================================================== */

// Shared State
const portalState = {
  currentRole: null,
  currentFeature: null,
  teachers: [
    { id: "T1", name: "Ananya Sharma", subject: "Mathematics", classes: "Grade 8, Grade 9", status: "Active" },
    { id: "T2", name: "Rahul Verma", subject: "Science", classes: "Grade 10", status: "Active" },
    { id: "T3", name: "Priya Nair", subject: "English", classes: "Grade 8, Grade 10", status: "Active" }
  ],
  students: [
    { roll: "101", name: "Arjun Kumar", class: "Grade 10-A", parent: "Rajesh Kumar", status: "Active" },
    { roll: "102", name: "Diya Patel", class: "Grade 10-A", parent: "Sanjay Patel", status: "Active" },
    { roll: "103", name: "Karan Johar", class: "Grade 9-B", parent: "Rakesh Johar", status: "Active" }
  ],
  parents: [
    { id: "P1", name: "Rajesh Kumar", child: "Arjun Kumar", contact: "+91 98765 43210" },
    { id: "P2", name: "Sanjay Patel", child: "Diya Patel", contact: "+91 87654 32109" }
  ],
  classes: [
    { id: "C1", name: "Grade 10-A", teacher: "Rahul Verma", strength: "32", year: "2026-27" },
    { id: "C2", name: "Grade 9-B", teacher: "Ananya Sharma", strength: "28", year: "2026-27" }
  ],
  subjects: [
    { code: "MATH101", name: "Advanced Algebra", teacher: "Ananya Sharma", class: "Grade 10-A" },
    { code: "SCI102", name: "Physics & Chemistry", teacher: "Rahul Verma", class: "Grade 10-A" }
  ],
  announcements: [
    { date: "2026-07-20", title: "Independence Day Celebrations", scope: "School-wide", content: "School will celebrate Independence Day on Aug 15th with cultural performances." },
    { date: "2026-07-18", title: "Term 1 Exam Schedule", scope: "Grade 10-A", content: "Term 1 exams start from September 5th. Syllabus has been uploaded." }
  ],
  attendance: {
    studentToday: [
      { roll: "101", name: "Arjun Kumar", status: "Present" },
      { roll: "102", name: "Diya Patel", status: "Present" },
      { roll: "103", name: "Karan Johar", status: "Absent" }
    ],
    teacherToday: [
      { id: "T1", name: "Ananya Sharma", status: "Present" },
      { id: "T2", name: "Rahul Verma", status: "Present" },
      { id: "T3", name: "Priya Nair", status: "Absent" }
    ]
  },
  assignments: [
    { id: "A1", title: "Quadratic Equations Worksheet", class: "Grade 10-A", subject: "Maths", deadline: "2026-07-28", status: "Graded" },
    { id: "A2", title: "Photosynthesis Experiment Report", class: "Grade 10-A", subject: "Science", deadline: "2026-07-30", status: "Submitted" }
  ],
  studyMaterials: [
    { title: "Algebra Basics Notes.pdf", subject: "Maths", uploadedBy: "Ananya Sharma", size: "1.2 MB" },
    { title: "Light Reflection Slides.pptx", subject: "Science", uploadedBy: "Rahul Verma", size: "4.5 MB" }
  ],
  chatMessages: [
    { from: "teacher", text: "Hello! Arjun has performed really well in today's mock algebra test." },
    { from: "parent", text: "Thank you ma'am, he has been practicing daily at home." }
  ],
  fees: {
    total: "₹45,000",
    paid: "₹30,000",
    due: "₹15,000",
    status: "Due"
  }
};

// DOM Selectors for Portal
const headerLoginBtn = document.querySelector("#headerLoginBtn");
const portalContainer = document.querySelector("#portal-container");
const exitPortalBtn = document.querySelector("#exitPortalBtn");
const portalLoginForm = document.querySelector("#portalLoginForm");
const portalRoleSelect = document.querySelector("#portalRoleSelect");
const portalUsername = document.querySelector("#portalUsername");
const portalPassword = document.querySelector("#portalPassword");
const loginScreen = document.querySelector("#portal-login-screen");
const dashboardScreen = document.querySelector("#portal-dashboard-screen");
const sidebarMenu = document.querySelector("#sidebarMenu");
const portalLogoutBtn = document.querySelector("#portalLogoutBtn");
const profileAvatar = document.querySelector("#profileAvatar");
const profileName = document.querySelector("#profileName");
const profileRole = document.querySelector("#profileRole");
const currentFeatureTitle = document.querySelector("#currentFeatureTitle");
const dashboardContentPane = document.querySelector("#dashboardContentPane");
const sidebarToggle = document.querySelector("#sidebarToggle");
const dashboardSidebar = document.querySelector(".dashboard-sidebar");

// Define Menu items for each role
const roleMenuConfigs = {
  admin: [
    { id: "manage-teachers", name: "Manage Teachers", icon: "👥" },
    { id: "manage-students", name: "Manage Students", icon: "👨‍🎓" },
    { id: "manage-parents", name: "Manage Parents", icon: "👪" },
    { id: "manage-classes", name: "Manage Classes", icon: "🏫" },
    { id: "manage-subjects", name: "Manage Subjects", icon: "📚" },
    { id: "publish-announcements", name: "Publish Announcements", icon: "📢" },
    { id: "view-reports", name: "View Reports", icon: "📊" }
  ],
  principal: [
    { id: "attendance-reports", name: "Attendance Reports", icon: "📝" },
    { id: "academic-performance", name: "Academic Performance Analysis", icon: "📈" },
    { id: "school-wide-announcements", name: "School-wide Announcements", icon: "📣" },
    { id: "communication-teachers", name: "Communication with Teachers", icon: "💬" },
    { id: "school-reports", name: "School Reports", icon: "📋" },
    { id: "dashboard-analytics", name: "Dashboard Analytics", icon: "📊" }
  ],
  teacher: [
    { id: "my-classes", name: "My Classes", icon: "🏫" },
    { id: "student-list", name: "Student List", icon: "📋" },
    { id: "attendance-management", name: "Attendance Management", icon: "✅" },
    { id: "assignments", name: "Assignments", icon: "📝" },
    { id: "study-materials", name: "Study Materials", icon: "📁" },
    { id: "announcements", name: "Announcements", icon: "📢" },
    { id: "secure-messaging", name: "Secure Messaging", icon: "💬" },
    { id: "timetable", name: "Timetable", icon: "📅" },
    { id: "profile-management", name: "Profile Management", icon: "⚙️" }
  ],
  student: [
    { id: "student-dashboard", name: "View Dashboard", icon: "📊" },
    { id: "check-attendance", name: "Check Attendance", icon: "✅" },
    { id: "view-timetable", name: "View Timetable", icon: "📅" },
    { id: "download-study-materials", name: "Download Study Materials", icon: "📁" },
    { id: "submit-assignments", name: "Submit Assignments", icon: "📤" },
    { id: "view-homework", name: "View Homework", icon: "📝" },
    { id: "receive-announcements", name: "Receive Announcements", icon: "📢" },
    { id: "chat-teachers", name: "Chat with Teachers", icon: "💬" },
    { id: "track-exams", name: "Track Upcoming Exams", icon: "⏰" }
  ],
  parent: [
    { id: "child-information", name: "Child Information", icon: "👦" },
    { id: "attendance-tracking", name: "Attendance Tracking", icon: "📈" },
    { id: "parent-homework", name: "Homework", icon: "📝" },
    { id: "exam-results", name: "Exam Results", icon: "🏆" },
    { id: "fee-reminders", name: "Fee Reminders", icon: "💳" },
    { id: "school-announcements", name: "School Announcements", icon: "📢" },
    { id: "messaging-teachers", name: "Messaging with Teachers", icon: "💬" },
    { id: "parent-profile", name: "Profile Management", icon: "⚙️" }
  ]
};

// Open Portal View
if (headerLoginBtn) {
  headerLoginBtn.addEventListener("click", () => {
    portalContainer.classList.remove("portal-hidden");
    document.body.style.overflow = "hidden"; // disable page scroll
  });
}

// Exit Portal View
if (exitPortalBtn) {
  exitPortalBtn.addEventListener("click", () => {
    portalContainer.classList.add("portal-hidden");
    document.body.style.overflow = ""; // enable page scroll
  });
}

// Logout Action
if (portalLogoutBtn) {
  portalLogoutBtn.addEventListener("click", () => {
    portalState.currentRole = null;
    portalState.currentFeature = null;
    dashboardScreen.classList.add("portal-hidden");
    loginScreen.classList.remove("portal-hidden");
  });
}

// Sidebar responsive toggle
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    dashboardSidebar.classList.toggle("is-open");
  });
}

// Quick Demo Login Event
document.querySelectorAll("[data-demo-role]").forEach(btn => {
  btn.addEventListener("click", () => {
    const role = btn.dataset.demoRole;
    loginAs(role, `${role.charAt(0).toUpperCase() + role.slice(1)} Guest`);
  });
});

// Portal Login Form Submit
if (portalLoginForm) {
  portalLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const role = portalRoleSelect.value;
    const username = portalUsername.value.trim() || "User";
    loginAs(role, username);
  });
}

// Handle login state transitions
function loginAs(role, name) {
  portalState.currentRole = role;
  
  // Set Profile info
  if (profileAvatar) profileAvatar.textContent = name.charAt(0).toUpperCase();
  if (profileName) profileName.textContent = name;
  if (profileRole) profileRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);

  // Load Menu items
  renderSidebarMenu(role);

  // Swap Screen
  loginScreen.classList.add("portal-hidden");
  dashboardScreen.classList.remove("portal-hidden");

  // Load First Feature by Default
  const firstFeature = roleMenuConfigs[role][0].id;
  selectFeature(firstFeature);

  // Setup header date display
  const currentDateDisplay = document.querySelector("#currentDateDisplay");
  if (currentDateDisplay) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
  }
}

// Render Sidebar Menu
function renderSidebarMenu(role) {
  if (!sidebarMenu) return;
  sidebarMenu.innerHTML = "";
  
  const menuItems = roleMenuConfigs[role];
  menuItems.forEach(item => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "menu-item";
    btn.dataset.feature = item.id;
    btn.innerHTML = `<span>${item.icon}</span> ${item.name}`;
    
    btn.addEventListener("click", () => {
      selectFeature(item.id);
      dashboardSidebar.classList.remove("is-open"); // Close on mobile navigation
    });
    
    sidebarMenu.appendChild(btn);
  });
}

// Switch feature view
function selectFeature(featureId) {
  portalState.currentFeature = featureId;

  // Set active class on menu
  document.querySelectorAll(".menu-item").forEach(btn => {
    if (btn.dataset.feature === featureId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Get active menu item name
  const activeMenu = roleMenuConfigs[portalState.currentRole].find(item => item.id === featureId);
  if (currentFeatureTitle && activeMenu) {
    currentFeatureTitle.textContent = activeMenu.name;
  }

  // Render View content
  renderFeatureContent(featureId);
}

// Dynamic Feature Content Render Router
function renderFeatureContent(featureId) {
  if (!dashboardContentPane) return;
  dashboardContentPane.innerHTML = "";

  switch (featureId) {
    // === ADMIN PORTAL ===
    case "manage-teachers":
      renderManageTeachers();
      break;
    case "manage-students":
      renderManageStudents();
      break;
    case "manage-parents":
      renderManageParents();
      break;
    case "manage-classes":
      renderManageClasses();
      break;
    case "manage-subjects":
      renderManageSubjects();
      break;
    case "publish-announcements":
      renderPublishAnnouncements();
      break;
    case "view-reports":
      renderViewReports();
      break;

    // === PRINCIPAL PORTAL ===
    case "attendance-reports":
      renderPrincipalAttendanceReports();
      break;
    case "academic-performance":
      renderPrincipalAcademicPerformance();
      break;
    case "school-wide-announcements":
      renderSchoolWideAnnouncements();
      break;
    case "communication-teachers":
      renderCommunicationTeachers();
      break;
    case "school-reports":
      renderPrincipalSchoolReports();
      break;
    case "dashboard-analytics":
      renderPrincipalDashboardAnalytics();
      break;

    // === TEACHER PORTAL ===
    case "my-classes":
      renderTeacherClasses();
      break;
    case "student-list":
      renderTeacherStudentList();
      break;
    case "attendance-management":
      renderTeacherAttendanceManagement();
      break;
    case "assignments":
      renderTeacherAssignments();
      break;
    case "study-materials":
      renderTeacherStudyMaterials();
      break;
    case "announcements":
      renderTeacherAnnouncements();
      break;
    case "secure-messaging":
      renderTeacherSecureMessaging();
      break;
    case "timetable":
      renderTeacherTimetable();
      break;
    case "profile-management":
      renderTeacherProfileManagement();
      break;

    // === STUDENT PORTAL ===
    case "student-dashboard":
      renderStudentDashboard();
      break;
    case "check-attendance":
      renderStudentCheckAttendance();
      break;
    case "view-timetable":
      renderStudentTimetable();
      break;
    case "download-study-materials":
      renderStudentDownloadMaterials();
      break;
    case "submit-assignments":
      renderStudentSubmitAssignments();
      break;
    case "view-homework":
      renderStudentHomework();
      break;
    case "receive-announcements":
      renderStudentAnnouncements();
      break;
    case "chat-teachers":
      renderStudentChat();
      break;
    case "track-exams":
      renderStudentExams();
      break;

    // === PARENT PORTAL ===
    case "child-information":
      renderParentChildInfo();
      break;
    case "attendance-tracking":
      renderParentAttendanceTracking();
      break;
    case "parent-homework":
      renderParentHomework();
      break;
    case "exam-results":
      renderParentExamResults();
      break;
    case "fee-reminders":
      renderParentFees();
      break;
    case "school-announcements":
      renderParentAnnouncements();
      break;
    case "messaging-teachers":
      renderParentMessaging();
      break;
    case "parent-profile":
      renderParentProfile();
      break;

    default:
      dashboardContentPane.innerHTML = `<div class="portal-card"><h3>Coming Soon</h3><p>This module is under active development.</p></div>`;
  }
}


/* ==========================================================================
   RENDER IMPLEMENTATION FUNCTIONS
   ========================================================================== */

// --- ADMIN ---
function renderManageTeachers() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  // Form block
  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Add New Teacher</h3></div>
    <form class="portal-form" id="addTeacherForm">
      <div class="portal-input-group">
        <label>Full Name</label>
        <input type="text" id="teacherName" placeholder="e.g. Rahul Sharma" required>
      </div>
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Primary Subject</label>
          <input type="text" id="teacherSubject" placeholder="e.g. Science" required>
        </div>
        <div class="portal-input-group">
          <label>Assigned Classes</label>
          <input type="text" id="teacherClasses" placeholder="e.g. Grade 10" required>
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Save Profile</button>
    </form>
  `;

  // List block
  const listCard = document.createElement("div");
  listCard.className = "portal-card";
  
  function updateList() {
    let rows = portalState.teachers.map(t => `
      <tr>
        <td><strong>${t.name}</strong></td>
        <td>${t.subject}</td>
        <td>${t.classes}</td>
        <td><span class="status-badge active">${t.status}</span></td>
      </tr>
    `).join("");

    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Teacher Profiles</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Classes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  }

  updateList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  // Submit trigger
  const form = container.querySelector("#addTeacherForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = container.querySelector("#teacherName").value.trim();
    const subject = container.querySelector("#teacherSubject").value.trim();
    const classes = container.querySelector("#teacherClasses").value.trim();
    
    portalState.teachers.push({
      id: "T" + (portalState.teachers.length + 1),
      name,
      subject,
      classes,
      status: "Active"
    });

    updateList();
    form.reset();
  });
}

function renderManageStudents() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Student Admission</h3></div>
    <form class="portal-form" id="studentForm">
      <div class="portal-input-group">
        <label>Student Full Name</label>
        <input type="text" id="studentName" required>
      </div>
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Assign Class</label>
          <select id="studentClass" required>
            <option value="Grade 10-A">Grade 10-A</option>
            <option value="Grade 9-B">Grade 9-B</option>
          </select>
        </div>
        <div class="portal-input-group">
          <label>Parent / Guardian Name</label>
          <input type="text" id="studentParent" required>
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Admit Student</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Active Enrolments</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Parent</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.students.map(s => `
              <tr>
                <td>#${s.roll}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.class}</td>
                <td>${s.parent}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#studentForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = container.querySelector("#studentName").value.trim();
    const parent = container.querySelector("#studentParent").value.trim();
    const cls = container.querySelector("#studentClass").value;
    const nextRoll = String(Number(portalState.students[portalState.students.length - 1].roll) + 1);

    portalState.students.push({
      roll: nextRoll,
      name,
      class: cls,
      parent,
      status: "Active"
    });

    renderList();
    form.reset();
  });
}

function renderManageParents() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Create Parent Profile</h3></div>
    <form class="portal-form" id="parentForm">
      <div class="portal-input-group">
        <label>Parent Name</label>
        <input type="text" id="parentName" required>
      </div>
      <div class="portal-input-group">
        <label>Linked Child Student</label>
        <input type="text" id="parentChild" required>
      </div>
      <div class="portal-input-group">
        <label>Contact Number</label>
        <input type="text" id="parentContact" required>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Save Profile</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Parent Accounts</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Parent Name</th>
              <th>Linked Student</th>
              <th>Contact Details</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.parents.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>${p.child}</td>
                <td>${p.contact}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#parentForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = container.querySelector("#parentName").value.trim();
    const child = container.querySelector("#parentChild").value.trim();
    const contact = container.querySelector("#parentContact").value.trim();

    portalState.parents.push({
      id: "P" + (portalState.parents.length + 1),
      name,
      child,
      contact
    });

    renderList();
    form.reset();
  });
}

function renderManageClasses() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Create Class Section</h3></div>
    <form class="portal-form" id="classForm">
      <div class="portal-input-group">
        <label>Class Name</label>
        <input type="text" id="className" placeholder="e.g. Grade 10-C" required>
      </div>
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Assign Class Teacher</label>
          <select id="classTeacher">
            ${portalState.teachers.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
          </select>
        </div>
        <div class="portal-input-group">
          <label>Academic Year</label>
          <input type="text" id="classYear" value="2026-27" required>
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Register Class</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Active Classes</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Class Teacher</th>
              <th>Students Count</th>
              <th>Academic Year</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.classes.map(c => `
              <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.teacher}</td>
                <td>${c.strength} students</td>
                <td>${c.year}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#classForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = container.querySelector("#className").value.trim();
    const teacher = container.querySelector("#classTeacher").value;
    const year = container.querySelector("#classYear").value.trim();

    portalState.classes.push({
      id: "C" + (portalState.classes.length + 1),
      name,
      teacher,
      strength: "0",
      year
    });

    renderList();
    form.reset();
  });
}

function renderManageSubjects() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Add Subject Structure</h3></div>
    <form class="portal-form" id="subjectForm">
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Subject Code</label>
          <input type="text" id="subjectCode" placeholder="e.g. CHEM101" required>
        </div>
        <div class="portal-input-group">
          <label>Subject Name</label>
          <input type="text" id="subjectName" placeholder="e.g. chemistry" required>
        </div>
      </div>
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Assign Teacher</label>
          <select id="subjectTeacher">
            ${portalState.teachers.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
          </select>
        </div>
        <div class="portal-input-group">
          <label>Target Class</label>
          <select id="subjectClass">
            ${portalState.classes.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
          </select>
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Create Subject</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Curriculum Subjects</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject Name</th>
              <th>Teacher</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.subjects.map(s => `
              <tr>
                <td><code>${s.code}</code></td>
                <td><strong>${s.name}</strong></td>
                <td>${s.teacher}</td>
                <td>${s.class}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#subjectForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = container.querySelector("#subjectCode").value.trim().toUpperCase();
    const name = container.querySelector("#subjectName").value.trim();
    const teacher = container.querySelector("#subjectTeacher").value;
    const cls = container.querySelector("#subjectClass").value;

    portalState.subjects.push({ code, name, teacher, class: cls });
    renderList();
    form.reset();
  });
}

function renderPublishAnnouncements() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Publish New Announcement</h3></div>
    <form class="portal-form" id="annForm">
      <div class="portal-input-group">
        <label>Announcement Title</label>
        <input type="text" id="annTitle" required>
      </div>
      <div class="portal-input-group">
        <label>Scope / Audience</label>
        <select id="annScope">
          <option value="School-wide">School-wide</option>
          <option value="Grade 10-A">Grade 10-A</option>
          <option value="Grade 9-B">Grade 9-B</option>
        </select>
      </div>
      <div class="portal-input-group">
        <label>Details / Content</label>
        <textarea id="annContent" rows="4" required></textarea>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Publish Notice</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Recent Notices</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Audience</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.announcements.map(a => `
              <tr>
                <td>${a.date}</td>
                <td><strong>${a.title}</strong><br><small style="color:var(--muted);">${a.content}</small></td>
                <td><span class="status-badge active">${a.scope}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#annForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = container.querySelector("#annTitle").value.trim();
    const scope = container.querySelector("#annScope").value;
    const content = container.querySelector("#annContent").value.trim();
    const today = new Date().toISOString().split('T')[0];

    portalState.announcements.unshift({ date: today, title, scope, content });
    renderList();
    form.reset();
  });
}

function renderViewReports() {
  const container = document.createElement("div");
  container.className = "portal-form";
  container.innerHTML = `
    <div class="portal-metrics-grid">
      <div class="portal-metric-card">
        <p>Total Students</p>
        <h3>${portalState.students.length}</h3>
      </div>
      <div class="portal-metric-card">
        <p>Active Classes</p>
        <h3>${portalState.classes.length}</h3>
      </div>
      <div class="portal-metric-card">
        <p>Registered Parents</p>
        <h3>${portalState.parents.length}</h3>
      </div>
      <div class="portal-metric-card">
        <p>School Notices</p>
        <h3>${portalState.announcements.length}</h3>
      </div>
    </div>

    <div class="portal-card">
      <div class="portal-card-header"><h3>School Performance Overview</h3></div>
      <p style="margin-top:0;">This report shows an analytical summary of fees collection, student attendances, and class progress.</p>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Section / Area</th>
              <th>Total Capacity</th>
              <th>Current Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Admission Capacity</strong></td>
              <td>1,000 Seats</td>
              <td><span class="status-badge active">${portalState.students.length} admitted</span></td>
              <td>Enrolments are under target check.</td>
            </tr>
            <tr>
              <td><strong>Fee Collections</strong></td>
              <td>₹10,00,000 Target</td>
              <td><span class="status-badge present">₹7,20,000 Collected</span></td>
              <td>Next fee schedule starts next week.</td>
            </tr>
            <tr>
              <td><strong>Teacher Attendance</strong></td>
              <td>3 Registered</td>
              <td><span class="status-badge present">85% average</span></td>
              <td>Sufficient proxy teachers assigned.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}


// --- PRINCIPAL ---
function renderPrincipalAttendanceReports() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";
  
  const studentAttendanceCard = document.createElement("div");
  studentAttendanceCard.className = "portal-card";
  studentAttendanceCard.innerHTML = `
    <div class="portal-card-header"><h3>Student Attendance (Today)</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          ${portalState.attendance.studentToday.map(s => `
            <tr>
              <td>#${s.roll}</td>
              <td><strong>${s.name}</strong></td>
              <td><span class="status-badge ${s.status === 'Present' ? 'present' : 'absent'}">${s.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  const teacherAttendanceCard = document.createElement("div");
  teacherAttendanceCard.className = "portal-card";
  teacherAttendanceCard.innerHTML = `
    <div class="portal-card-header"><h3>Teacher Attendance (Today)</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Teacher Name</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          ${portalState.attendance.teacherToday.map(t => `
            <tr>
              <td>${t.id}</td>
              <td><strong>${t.name}</strong></td>
              <td><span class="status-badge ${t.status === 'Present' ? 'present' : 'absent'}">${t.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  container.appendChild(studentAttendanceCard);
  container.appendChild(teacherAttendanceCard);
  dashboardContentPane.appendChild(container);
}

function renderPrincipalAcademicPerformance() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Academic Exam Performance Analysis</h3></div>
    <p>Performance analysis of classes and subject averages for the term:</p>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Assigned Teacher</th>
            <th>Pass Percentage</th>
            <th>Top Performer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Mathematics</strong></td>
            <td>Ananya Sharma</td>
            <td><span class="status-badge present">92%</span></td>
            <td>Arjun Kumar (98/100)</td>
          </tr>
          <tr>
            <td><strong>Science</strong></td>
            <td>Rahul Verma</td>
            <td><span class="status-badge present">88%</span></td>
            <td>Diya Patel (95/100)</td>
          </tr>
          <tr>
            <td><strong>English</strong></td>
            <td>Priya Nair</td>
            <td><span class="status-badge present">95%</span></td>
            <td>Arjun Kumar (94/100)</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderSchoolWideAnnouncements() {
  // Use same list/form structure as Admin Publish
  renderPublishAnnouncements();
}

function renderCommunicationTeachers() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const composeCard = document.createElement("div");
  composeCard.className = "portal-card";
  composeCard.innerHTML = `
    <div class="portal-card-header"><h3>Broadcast Message to Teachers</h3></div>
    <form class="portal-form" id="teachMsgForm">
      <div class="portal-input-group">
        <label>Message Content</label>
        <textarea id="teachMsgContent" rows="5" placeholder="Enter instructions or announcements for the teaching staff..." required></textarea>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Send Message</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";
  listCard.innerHTML = `
    <div class="portal-card-header"><h3>Staff Directory</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Teacher</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${portalState.teachers.map(t => `
            <tr>
              <td><strong>${t.name}</strong></td>
              <td>${t.subject}</td>
              <td><button class="primary-btn" style="min-height:28px; padding:0 10px; font-size:11px;">Direct Chat</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;

  container.appendChild(composeCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#teachMsgForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message broadcasted successfully to all teachers.");
    form.reset();
  });
}

function renderPrincipalSchoolReports() {
  // Review reports summary
  renderViewReports();
}

function renderPrincipalDashboardAnalytics() {
  const container = document.createElement("div");
  container.className = "portal-form";
  container.innerHTML = `
    <div class="portal-metrics-grid">
      <div class="portal-metric-card">
        <p>Total Enrolment</p>
        <h3>${portalState.students.length}</h3>
      </div>
      <div class="portal-metric-card">
        <p>Teacher Attendance</p>
        <h3>2 / 3 Present</h3>
      </div>
      <div class="portal-metric-card">
        <p>Class Sections</p>
        <h3>${portalState.classes.length} Active</h3>
      </div>
      <div class="portal-metric-card">
        <p>Academic Average</p>
        <h3>A- Grade</h3>
      </div>
    </div>
    
    <div class="portal-grid-2x2">
      <div class="portal-card">
        <div class="portal-card-header"><h3>School Performance Chart</h3></div>
        <div style="height: 180px; display: flex; align-items: flex-end; justify-content: space-around; padding-top: 20px;">
          <div style="text-align: center; width: 60px;">
            <div style="background: var(--mint); height: 120px; border-radius: 4px;"></div>
            <span style="font-size:11px; margin-top:8px; display:block;">Maths</span>
          </div>
          <div style="text-align: center; width: 60px;">
            <div style="background: var(--cyan); height: 105px; border-radius: 4px;"></div>
            <span style="font-size:11px; margin-top:8px; display:block;">Science</span>
          </div>
          <div style="text-align: center; width: 60px;">
            <div style="background: var(--purple); height: 140px; border-radius: 4px;"></div>
            <span style="font-size:11px; margin-top:8px; display:block;">English</span>
          </div>
        </div>
      </div>
      
      <div class="portal-card">
        <div class="portal-card-header"><h3>Recent System Audits</h3></div>
        <ul style="font-size:13px; line-height:1.8; opacity:0.8; padding-left:18px;">
          <li>Admin admitted a student: Arjun Kumar.</li>
          <li>Attendance registered for today: 2 Absentees.</li>
          <li>School announcement: Independence Day celebration published.</li>
        </ul>
      </div>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}


// --- TEACHER ---
function renderTeacherClasses() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>My Assigned Classes</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Subject</th>
            <th>Schedules</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Grade 10-A</strong></td>
            <td>Mathematics</td>
            <td>Monday, Wednesday, Friday</td>
            <td>09:00 AM - 10:00 AM</td>
          </tr>
          <tr>
            <td><strong>Grade 9-B</strong></td>
            <td>Mathematics</td>
            <td>Tuesday, Thursday</td>
            <td>11:00 AM - 12:00 PM</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderTeacherStudentList() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Student Profiles</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Student Name</th>
            <th>Class Name</th>
            <th>Academic Status</th>
          </tr>
        </thead>
        <tbody>
          ${portalState.students.map(s => `
            <tr>
              <td>#${s.roll}</td>
              <td><strong>${s.name}</strong></td>
              <td>${s.class}</td>
              <td><span class="status-badge present">90% Attendance</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderTeacherAttendanceManagement() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Mark Attendance (Today)</h3></div>
    <form id="attendanceForm" class="portal-form">
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.students.map(s => `
              <tr>
                <td>#${s.roll}</td>
                <td><strong>${s.name}</strong></td>
                <td>${s.class}</td>
                <td>
                  <label style="display:inline-flex; align-items:center; gap:8px; margin:0; cursor:pointer;">
                    <input type="checkbox" name="attendanceStatus" value="${s.roll}" checked style="width:auto;"> Present
                  </label>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Save Attendance Roll</button>
    </form>
  `;
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#attendanceForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Attendance register locked and saved for today.");
  });
}

function renderTeacherAssignments() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Create Assignment</h3></div>
    <form class="portal-form" id="assForm">
      <div class="portal-input-group">
        <label>Assignment Title</label>
        <input type="text" id="assTitle" required>
      </div>
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Target Class</label>
          <select id="assClass">
            <option value="Grade 10-A">Grade 10-A</option>
            <option value="Grade 9-B">Grade 9-B</option>
          </select>
        </div>
        <div class="portal-input-group">
          <label>Deadline</label>
          <input type="date" id="assDeadline" required>
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Publish Assignment</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Assigned Works</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Class</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.assignments.map(a => `
              <tr>
                <td><strong>${a.title}</strong></td>
                <td>${a.class}</td>
                <td>${a.deadline}</td>
                <td><span class="status-badge ${a.status === 'Graded' ? 'present' : 'active'}">${a.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#assForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = container.querySelector("#assTitle").value.trim();
    const cls = container.querySelector("#assClass").value;
    const deadline = container.querySelector("#assDeadline").value;

    portalState.assignments.push({
      id: "A" + (portalState.assignments.length + 1),
      title,
      class: cls,
      subject: "Maths",
      deadline,
      status: "Published"
    });

    renderList();
    form.reset();
  });
}

function renderTeacherStudyMaterials() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Upload Lesson Resource</h3></div>
    <form class="portal-form" id="matForm">
      <div class="portal-input-group">
        <label>Material / Chapter Title</label>
        <input type="text" id="matTitle" placeholder="e.g. Chapter 4 Notes" required>
      </div>
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Subject</label>
          <input type="text" id="matSubject" value="Mathematics" required>
        </div>
        <div class="portal-input-group">
          <label>File Upload Mock</label>
          <input type="text" id="matFile" placeholder="e.g. algebra_notes.pdf" required>
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Publish File</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Uploaded Materials</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.studyMaterials.map(m => `
              <tr>
                <td><strong>${m.title}</strong></td>
                <td>${m.subject}</td>
                <td>${m.size}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#matForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = container.querySelector("#matTitle").value.trim();
    const subject = container.querySelector("#matSubject").value.trim();
    const file = container.querySelector("#matFile").value.trim();

    portalState.studyMaterials.push({
      title: file,
      subject,
      uploadedBy: "Teacher Guest",
      size: "2.4 MB"
    });

    renderList();
    form.reset();
  });
}

function renderTeacherAnnouncements() {
  renderPublishAnnouncements();
}

function renderTeacherSecureMessaging() {
  const container = document.createElement("div");
  container.className = "portal-card";
  
  function renderChat() {
    container.innerHTML = `
      <div class="portal-card-header"><h3>Secure Messaging (Parent: Rajesh Kumar)</h3></div>
      <div class="chat-container">
        <div class="chat-messages" id="chatMsgs">
          ${portalState.chatMessages.map(m => `
            <div class="chat-bubble ${m.from === 'teacher' ? 'sent' : 'received'}">
              ${m.text}
            </div>
          `).join("")}
        </div>
        <form class="chat-input-bar" id="chatForm">
          <input type="text" id="chatInputText" placeholder="Type a message to parent..." required>
          <button type="submit" class="chat-send-btn">Send</button>
        </form>
      </div>
    `;
    
    // Auto-scroll chat
    setTimeout(() => {
      const msgs = container.querySelector("#chatMsgs");
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
    }, 50);
  }

  renderChat();
  dashboardContentPane.appendChild(container);

  container.addEventListener("submit", (e) => {
    if (e.target.id === "chatForm") {
      e.preventDefault();
      const input = container.querySelector("#chatInputText");
      const text = input.value.trim();
      if (!text) return;

      portalState.chatMessages.push({
        from: "teacher",
        text
      });

      renderChat();
    }
  });
}

function renderTeacherTimetable() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Teaching Schedule</h3></div>
    <div class="timetable-grid">
      <div class="timetable-day-column">
        <div class="timetable-day-header">Monday</div>
        <div class="timetable-period">
          <strong>Period 1</strong>
          Grade 10-A<br>
          <span>09:00 - 10:00</span>
        </div>
        <div class="timetable-period">
          <strong>Period 3</strong>
          Grade 9-B<br>
          <span>11:00 - 12:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Tuesday</div>
        <div class="timetable-period">
          <strong>Period 2</strong>
          Grade 9-B<br>
          <span>10:00 - 11:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Wednesday</div>
        <div class="timetable-period">
          <strong>Period 1</strong>
          Grade 10-A<br>
          <span>09:00 - 10:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Thursday</div>
        <div class="timetable-period">
          <strong>Period 2</strong>
          Grade 9-B<br>
          <span>10:00 - 11:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Friday</div>
        <div class="timetable-period">
          <strong>Period 1</strong>
          Grade 10-A<br>
          <span>09:00 - 10:00</span>
        </div>
      </div>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderTeacherProfileManagement() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Profile Settings</h3></div>
    <form class="portal-form" id="teacherProfileForm">
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Teacher Name</label>
          <input type="text" value="Rahul Verma" required>
        </div>
        <div class="portal-input-group">
          <label>Email Address</label>
          <input type="email" value="rahul.verma@zencampus.com" required>
        </div>
      </div>
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Update Password</label>
          <input type="password" placeholder="Enter new password">
        </div>
        <div class="portal-input-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm new password">
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Update Profile</button>
    </form>
  `;
  dashboardContentPane.appendChild(container);

  container.querySelector("#teacherProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Profile settings updated successfully.");
  });
}


// --- STUDENT ---
function renderStudentDashboard() {
  const container = document.createElement("div");
  container.className = "portal-form";
  container.innerHTML = `
    <div class="portal-metrics-grid">
      <div class="portal-metric-card">
        <p>My GPA</p>
        <h3>3.8 / 4.0</h3>
      </div>
      <div class="portal-metric-card">
        <p>Total Attendance</p>
        <h3>94.5%</h3>
      </div>
      <div class="portal-metric-card">
        <p>Pending Assignments</p>
        <h3>${portalState.assignments.filter(a => a.status === 'Published').length} Pending</h3>
      </div>
      <div class="portal-metric-card">
        <p>Exam Schedules</p>
        <h3>Term 1 Near</h3>
      </div>
    </div>
    
    <div class="portal-grid-2x2">
      <div class="portal-card">
        <div class="portal-card-header"><h3>My Profile</h3></div>
        <table class="portal-table">
          <tr>
            <td><strong>Name</strong></td>
            <td>Arjun Kumar</td>
          </tr>
          <tr>
            <td><strong>Class</strong></td>
            <td>Grade 10-A</td>
          </tr>
          <tr>
            <td><strong>Parent</strong></td>
            <td>Rajesh Kumar</td>
          </tr>
        </table>
      </div>
      
      <div class="portal-card">
        <div class="portal-card-header"><h3>Recent Activities</h3></div>
        <ul style="font-size:13px; line-height:2; opacity:0.8;">
          <li>Submitted experiment report for Physics class.</li>
          <li>Admitted into Academic year 2026-2027.</li>
          <li>Science class attendance checked as Present.</li>
        </ul>
      </div>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderStudentCheckAttendance() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>My Attendance Records</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Classes Held</th>
            <th>Attended</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>July 2026</strong></td>
            <td>22 Classes</td>
            <td>21 Classes</td>
            <td><span class="status-badge present">95.4%</span></td>
          </tr>
          <tr>
            <td><strong>June 2026</strong></td>
            <td>20 Classes</td>
            <td>19 Classes</td>
            <td><span class="status-badge present">95.0%</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderStudentTimetable() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>My Daily Schedule</h3></div>
    <div class="timetable-grid">
      <div class="timetable-day-column">
        <div class="timetable-day-header">Monday</div>
        <div class="timetable-period">
          <strong>Mathematics</strong><br>
          <span>09:00 - 10:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Tuesday</div>
        <div class="timetable-period">
          <strong>Science</strong><br>
          <span>10:00 - 11:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Wednesday</div>
        <div class="timetable-period">
          <strong>Mathematics</strong><br>
          <span>09:00 - 10:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Thursday</div>
        <div class="timetable-period">
          <strong>Science</strong><br>
          <span>10:00 - 11:00</span>
        </div>
      </div>
      <div class="timetable-day-column">
        <div class="timetable-day-header">Friday</div>
        <div class="timetable-period">
          <strong>English</strong><br>
          <span>09:00 - 10:00</span>
        </div>
      </div>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderStudentDownloadMaterials() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Study Resources & Downloads</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Resource File</th>
            <th>Subject</th>
            <th>Uploaded By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${portalState.studyMaterials.map(m => `
            <tr>
              <td><strong>${m.title}</strong><br><small style="color:var(--muted);">${m.size}</small></td>
              <td>${m.subject}</td>
              <td>${m.uploadedBy}</td>
              <td><button class="primary-btn" style="min-height:30px; padding:0 12px; font-size:12px;">Download</button></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderStudentSubmitAssignments() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const formCard = document.createElement("div");
  formCard.className = "portal-card";
  formCard.innerHTML = `
    <div class="portal-card-header"><h3>Submit Homework File</h3></div>
    <form class="portal-form" id="hwSubmitForm">
      <div class="portal-input-group">
        <label>Select Assignment</label>
        <select id="hwAssignment">
          ${portalState.assignments.map(a => `<option value="${a.id}">${a.title}</option>`).join("")}
        </select>
      </div>
      <div class="portal-input-group">
        <label>Mock File Upload</label>
        <input type="text" id="hwFileName" placeholder="e.g. math_homework_arjun.pdf" required>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Upload Submission</button>
    </form>
  `;

  const listCard = document.createElement("div");
  listCard.className = "portal-card";

  function renderList() {
    listCard.innerHTML = `
      <div class="portal-card-header"><h3>Submission Log</h3></div>
      <div class="portal-table-wrapper">
        <table class="portal-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${portalState.assignments.map(a => `
              <tr>
                <td><strong>${a.title}</strong></td>
                <td><span class="status-badge ${a.status === 'Graded' ? 'present' : 'active'}">${a.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  renderList();
  container.appendChild(formCard);
  container.appendChild(listCard);
  dashboardContentPane.appendChild(container);

  const form = container.querySelector("#hwSubmitForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const assId = container.querySelector("#hwAssignment").value;
    const found = portalState.assignments.find(a => a.id === assId);
    if (found) {
      found.status = "Submitted";
    }
    renderList();
    alert("Assignment file uploaded successfully!");
    form.reset();
  });
}

function renderStudentHomework() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Active Homework Tasks</h3></div>
    <p>Check pending homework and lessons assigned by your classes:</p>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Homework Detail</th>
            <th>Class Teacher</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Complete Algebra problems 1 to 15</strong></td>
            <td>Ananya Sharma</td>
            <td>July 28, 2026</td>
          </tr>
          <tr>
            <td><strong>Write experiment observations for Light reflection</strong></td>
            <td>Rahul Verma</td>
            <td>July 30, 2026</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

// Student View Announcements
function renderStudentAnnouncements() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>School Notices Inbox</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <tbody>
          ${portalState.announcements.map(a => `
            <tr>
              <td>
                <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                  <strong>${a.title}</strong>
                  <span class="status-badge active">${a.scope}</span>
                </div>
                <p style="margin:0 0 4px 0; font-size:12px; opacity:0.8;">${a.content}</p>
                <small style="color:var(--muted);">${a.date}</small>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderStudentChat() {
  renderTeacherSecureMessaging();
}

function renderStudentExams() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Exam Schedule & Syllabus</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Exam Date</th>
            <th>Subject</th>
            <th>Syllabus Scope</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Sept 05, 2026</strong></td>
            <td>Algebra & Geometry</td>
            <td>Chapters 1 to 4</td>
          </tr>
          <tr>
            <td><strong>Sept 07, 2026</strong></td>
            <td>Physics & Chem</td>
            <td>Chapters 1 to 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}


// --- PARENT ---
function renderParentChildInfo() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Linked Student Profile</h3></div>
    <div style="display:flex; gap:20px; align-items:center; margin-bottom:20px;">
      <div style="width:80px; height:80px; border-radius:50%; background:var(--mint); display:grid; place-items:center; font-size:32px; font-weight:800;">AK</div>
      <div>
        <h3 style="margin:0 0 6px 0;">Arjun Kumar</h3>
        <p style="margin:0; color:var(--muted); font-size:14px;">Class: <strong>Grade 10-A</strong> | Roll: <strong>#101</strong></p>
      </div>
    </div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <tr>
          <td><strong>Current Academic Performance</strong></td>
          <td>A- Average (GPA 3.8)</td>
        </tr>
        <tr>
          <td><strong>Class Teacher</strong></td>
          <td>Rahul Verma (Science)</td>
        </tr>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderParentAttendanceTracking() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Child's Attendance Tracker</h3></div>
    <p>Daily track and alerts for absences:</p>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Attendance Status</th>
            <th>Alert / Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>July 22, 2026 (Today)</td>
            <td><span class="status-badge present">Present</span></td>
            <td>Checked in at 08:45 AM</td>
          </tr>
          <tr>
            <td>July 21, 2026</td>
            <td><span class="status-badge present">Present</span></td>
            <td>Checked in at 08:32 AM</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderParentHomework() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Child's Homework Records</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Assignment Title</th>
            <th>Subject</th>
            <th>Submission Status</th>
          </tr>
        </thead>
        <tbody>
          ${portalState.assignments.map(a => `
            <tr>
              <td><strong>${a.title}</strong></td>
              <td>${a.subject}</td>
              <td><span class="status-badge ${a.status === 'Graded' ? 'present' : 'active'}">${a.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderParentExamResults() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Child's Marks Cards</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Term Marks</th>
            <th>Grade</th>
            <th>Class Avg</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Mathematics</strong></td>
            <td>98 / 100</td>
            <td>A+</td>
            <td>84%</td>
          </tr>
          <tr>
            <td><strong>Science</strong></td>
            <td>90 / 100</td>
            <td>A</td>
            <td>78%</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  dashboardContentPane.appendChild(container);
}

function renderParentFees() {
  const container = document.createElement("div");
  container.className = "portal-grid-2x2";

  const statusCard = document.createElement("div");
  statusCard.className = "portal-card";
  statusCard.innerHTML = `
    <div class="portal-card-header"><h3>Fees Due Reminders</h3></div>
    <div style="margin-bottom: 20px;">
      <p style="margin:0 0 6px 0; color:var(--muted); font-size:13px;">Pending Tuition Fee</p>
      <h2 style="margin:0; font-size:36px; font-weight:800; color:var(--rose);">${portalState.fees.due}</h2>
    </div>
    <table class="portal-table">
      <tr>
        <td>Total Bill</td>
        <td>${portalState.fees.total}</td>
      </tr>
      <tr>
        <td>Amount Paid</td>
        <td>${portalState.fees.paid}</td>
      </tr>
    </table>
    <button class="primary-btn" style="width:100%; margin-top:20px;">Pay Fees Online</button>
  `;

  const receiptsCard = document.createElement("div");
  receiptsCard.className = "portal-card";
  receiptsCard.innerHTML = `
    <div class="portal-card-header"><h3>Payment Invoices</h3></div>
    <div class="portal-table-wrapper">
      <table class="portal-table">
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Amount</th>
            <th>Date Paid</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#INV-0982</td>
            <td>₹30,000</td>
            <td>June 12, 2026</td>
            <td><a href="#" style="color:var(--mint); text-decoration:underline;">View PDF</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  container.appendChild(statusCard);
  container.appendChild(receiptsCard);
  dashboardContentPane.appendChild(container);
}

function renderParentAnnouncements() {
  renderStudentAnnouncements();
}

function renderParentMessaging() {
  renderTeacherSecureMessaging();
}

function renderParentProfile() {
  const container = document.createElement("div");
  container.className = "portal-card";
  container.innerHTML = `
    <div class="portal-card-header"><h3>Account Settings</h3></div>
    <form class="portal-form" id="parentProfileForm">
      <div class="portal-form-row">
        <div class="portal-input-group">
          <label>Parent Full Name</label>
          <input type="text" value="Rajesh Kumar" required>
        </div>
        <div class="portal-input-group">
          <label>Contact Phone Number</label>
          <input type="text" value="+91 98765 43210" required>
        </div>
      </div>
      <button type="submit" class="primary-btn portal-submit-btn">Update Profile Details</button>
    </form>
  `;
  dashboardContentPane.appendChild(container);

  container.querySelector("#parentProfileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Parent profile details updated successfully.");
  });
}

// Contact Form Handler
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector("#contactForm");
  const contactSuccess = document.querySelector("#contactSuccessMessage");
  
  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.querySelector("#contactName").value;
      const email = document.querySelector("#contactEmail").value;
      const phone = document.querySelector("#contactPhone").value;
      const school = document.querySelector("#contactSchool").value;
      const message = document.querySelector("#contactMessage").value;
      
      console.log("Contact Form Submitted:", { name, email, phone, school, message });
      
      // Hide form and show success message
      contactForm.style.display = "none";
      contactSuccess.style.display = "block";
    });
  }
});

