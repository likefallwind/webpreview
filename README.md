# AI Laboratory Website

A modern, responsive website for an AI research laboratory showcasing research achievements, team members, and ongoing projects.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Single Page Navigation**: Smooth scrolling for lab introduction section
- **News Section**: Latest updates with summary on homepage and dedicated news page
- **Research Publications**: Filterable list of academic papers with venue badges
- **Project Showcase**: Horizontal row layout for research projects
- **Team Profiles**: Display of lab members with awards and achievements (max 3 awards per person)
- **Join Us Page**: Recruitment information with contact details
- **Static Content**: No forms or backend required, pure frontend implementation

## 📁 Project Structure

```
webpreview/
├── index.html          # Homepage with hero, lab intro, and news summary
├── news.html           # Full news page with all news items
├── research.html       # Academic publications page
├── projects.html       # Research projects showcase
├── team.html           # Team members page with awards
├── contact.html        # Join Us page (recruitment + contact info)
├── styles.css          # Global styles and component styles
├── script.js           # JavaScript for interactions and animations
├── README.md           # This file
└── data.md             # Data collection template
```

## 🚀 Getting Started

### Prerequisites

No build tools or dependencies required! This is a pure HTML/CSS/JavaScript project.

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

### Local Development

You can use any local server to preview the site. For example:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

**Using Node.js:**
```bash
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## 📝 Content Management

All content is managed directly in the HTML files. To update:

### Update Lab Information
- Edit `index.html` (About section with lab overview)
- Lab introduction uses smooth scrolling navigation via `#about` anchor

### Add/Edit News Items
- Edit `news.html` for the full news page
- Edit `index.html` news summary section (displays first 3 items with date + title only)
- Each news item includes: date, title, and content (2-3 lines)
- News items are displayed as full-width rows

### Add/Edit Publications
- Edit `research.html`
- Each paper is in a `.paper-item` div
- Update filters as needed (year, topic, venue)
- Include "View Paper" button in the bottom right corner

### Add/Edit Projects
- Edit `projects.html`
- Each project is in a `.project-row` div (horizontal row format)
- Update project title, description, and link

### Add/Edit Team Members
- Edit `team.html`
- Each member is in a `.team-card` div
- Include email address for each member
- Add awards section (maximum 3 awards per person)
- Each member has only one "个人主页" (Personal Homepage) button

### Update Contact/Recruitment Info
- Edit `contact.html` (now titled "加入我们" - Join Us)
- Recruitment information is displayed first
- Contact details (address, email, phone) are shown second
- No input forms - static information only

## 🎨 Customization

### Colors

Edit CSS variables in `styles.css` (lines 8-28):

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
    /* ... more colors ... */
}
```

### Fonts

The site uses Inter font from Google Fonts. To change:
1. Update the font import in the `<head>` section of HTML files
2. Update `font-family` in `styles.css`

## 📊 Data Collection

Refer to `data.md` for a complete template of all information needed to populate the website.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is available for educational and research purposes.

## 📧 Contact

For questions about this website, contact: contact@ailab.edu.cn