# CivicConnect (नागरिक मंच) 🇮🇳

**CivicConnect** is a clean, modern, and professional civic issue reporting and resolution platform tailored for Indian urban neighborhoods and municipal jurisdictions (MCD, BBMP, BMC, GHMC, PMC, etc.).

It empowers citizens to report problems such as:
1. **Potholes** (PWD / Municipal Road Wing)
2. **Garbage Overflow** (Solid Waste Management / Swachh Bharat Cell)
3. **Damaged Roads & Curbs** (Urban Infrastructure Wing)
4. **Broken Streetlights** (Electrical & Public Lighting Division)
5. **Water Leakage & Pipeline Bursts** (Jal Board / BWSSB / Water Supply Board)

---

## 🏛️ Key Features

### 1. Citizen Portal
- **Dashboard & Grievance Feed:** Overview of neighborhood complaints with category tags, status pills, and upvotes.
- **Report New Issue:**
  - Category selector with visual icons and target department guidance.
  - Title and detailed description fields with validation.
  - Photo upload with drag-and-drop, file selector, live preview, and quick test sample photos.
  - Geolocation detection (`navigator.geolocation` GPS auto-pinning).
  - Street address, prominent landmark, ward/sector, city selector, and pincode.
  - Citizen name and phone number for SMS tracking.
- **Complaint Detail Inspector:** Full modal with evidence photo, address, department details, officer notes, and community upvote capability.

### 2. Admin & Municipal Officer Section
- **Executive Metrics:** Total Grievances, Pending Verification, Under Resolution, Resolved, and Resolution Compliance Rate.
- **Departmental Distribution:** Progress indicators across all 5 civic categories.
- **Search & Multi-Filter Grid:** Filter by status (Pending, In Progress, Resolved), category, city, or keyword search.
- **Direct Officer Actions:** One-click assignment ("Assign Crew"), status updates to "Resolved", and custom department remarks.
- **CSV Grievance Export:** Client-side export of the grievance register for reporting and compliance audits.

### 3. Responsive Civic-Tech Design
- Built with Tailwind CSS and Lucide React icons.
- Fully responsive across desktop, tablet, and mobile with dedicated mobile card views and responsive drawer navigation.

---

## 📁 Project Structure

```
civic-connect/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── App.css
    ├── constants/
    │   └── categories.js          # Categories, statuses, and city definitions
    ├── data/
    │   └── initialComplaints.js   # Realistic initial complaints across Indian cities
    ├── context/
    │   ├── complaintContextDef.js # React Context definition
    │   ├── ComplaintContext.jsx   # State provider & localStorage persistence
    │   └── useComplaints.js       # Hook for easy component consumption
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.jsx         # Header with role toggle (Citizen ⟷ Admin)
    │   │   └── Footer.jsx         # Civic helplines (112, 1916, 1912) and portal links
    │   ├── common/
    │   │   ├── StatusBadge.jsx    # Status pill with color-coded dot
    │   │   ├── CategoryBadge.jsx  # Category badge with Lucide icon
    │   │   └── StatCard.jsx       # Metric cards with icons and trends
    │   └── complaints/
    │       ├── ComplaintCard.jsx  # Responsive grievance cards
    │       └── ComplaintDetailModal.jsx # Detailed complaint modal with officer action form
    └── pages/
        ├── citizen/
        │   ├── CitizenDashboard.jsx  # Citizen home feed & report CTA
        │   └── ReportIssuePage.jsx   # Interactive complaint submission form
        └── admin/
            └── AdminDashboard.jsx    # Officer analytics, category breakdown & grievance table
```

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:5173/`.

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

---

## 🔌 Supabase Readiness (Stage 2)
The data models in [`initialComplaints.js`](file:///C:/Users/HP/.gemini/antigravity/scratch/civic-connect/src/data/initialComplaints.js) and the state operations in [`ComplaintContext.jsx`](file:///C:/Users/HP/.gemini/antigravity/scratch/civic-connect/src/context/ComplaintContext.jsx) are structured to map 1:1 with Supabase Postgres tables (`complaints`, `categories`, `departments`) and Supabase Storage (for photo evidence).
