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

Content is now loaded dynamically from JSON files so updates flow from `info_list.xlsx` → JSON → HTML.

### Data update workflow
1. Install dependencies (one-time):
   ```bash
   pip install pandas openpyxl
   ```
2. Update `info_list.xlsx` with the latest news, publications, projects, and team information.
3. Run the loader to regenerate the JSON payloads consumed by the site:
   ```bash
   python scripts/load_data.py
   ```
   This writes `news.json`, `research.json`, `projects.json`, and `team.json` into the `data/` directory.
4. Serve the site from the repository root so the pages can `fetch` the JSON files (browsers block `file://` fetches). Examples:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```
   Then visit `http://localhost:8000`.

### Verify data is in sync with the site

Run the data integrity test to confirm the generated JSON matches the Excel source:

```bash
python -m unittest tests/test_data_integrity.py
```

If the test fails, regenerate the JSON with `python scripts/load_data.py` and re-run the test.

### Page-specific notes
- `news.html`: renders the news feed ordered by date from `data/news.json`.
- `research.html`: builds year-based sections from `data/research.json` with a dynamic year filter and optional paper links.
- `projects.html`: lists projects (with optional links/logos) from `data/projects.json`.
- `team.html`: shows faculty first, followed by students, sourced from `data/team.json` (awards limited to three items per person when available).

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