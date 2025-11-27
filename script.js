// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

// Only run scroll-based nav highlighting on single-page layouts
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scroll for Navigation Links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and elements
const animatedElements = document.querySelectorAll(
    '.feature-card, .research-card, .project-card, .team-card, .info-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would normally send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('感谢您的留言！我们会尽快与您联系。');
        
        // Reset form
        contactForm.reset();
    });
}

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    if (heroBackground && scrolled < hero.offsetHeight) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Counter Animation for Stats (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.style.visibility = 'visible';

// Data loading helpers
const DATA_DIR = 'data';

async function fetchData(fileName) {
    const url = `${DATA_DIR}/${fileName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`无法加载数据：${fileName}`);
        }
        return response.json();
    } catch (err) {
        // When opened via file://, browsers may block fetch; fall back to XHR for local viewing.
        if (window.location.protocol === 'file:') {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.overrideMimeType('application/json');
                xhr.open('GET', url, true);
                xhr.onload = function () {
                    if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
                        try {
                            resolve(JSON.parse(xhr.responseText));
                        } catch (parseErr) {
                            reject(parseErr);
                        }
                    } else {
                        reject(err);
                    }
                };
                xhr.onerror = () => reject(err);
                xhr.send();
            });
        }
        throw err;
    }
}

function createPlaceholderAvatar(name, photoUrl = '') {
    const avatar = document.createElement('div');
    avatar.className = 'team-avatar';

    if (photoUrl) {
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = name;
        avatar.appendChild(img);
        return avatar;
    }

    const placeholder = document.createElement('div');
    placeholder.className = 'avatar-placeholder';
    const initials = name ? name.trim().slice(0, 2).toUpperCase() : 'AI';
    placeholder.textContent = initials;
    avatar.appendChild(placeholder);
    return avatar;
}

function createLinkButton(label, url, className = 'paper-url-btn') {
    const link = document.createElement('a');
    link.textContent = label;
    link.className = className;
    link.href = url;
    link.target = '_blank';
    return link;
}

function formatDisplayDate(dateText) {
    const parsed = new Date(dateText);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toISOString().split('T')[0];
    }
    return dateText || '';
}

// News page rendering
async function loadNewsPage() {
    const newsContainer = document.getElementById('news-list');
    if (!newsContainer) return;

    try {
        const news = await fetchData('news.json');
        newsContainer.innerHTML = '';

        if (!news.length) {
            newsContainer.innerHTML = '<p class="empty-state">暂无新闻动态。</p>';
            return;
        }

        news.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'news-item';

            const dateEl = document.createElement('div');
            dateEl.className = 'news-date';
            dateEl.textContent = formatDisplayDate(item.date);

            const titleEl = document.createElement('h4');
            titleEl.className = 'news-title';
            titleEl.textContent = item.title;

            const contentEl = document.createElement('p');
            contentEl.className = 'news-content';
            contentEl.textContent = item.content;

            wrapper.append(dateEl, titleEl, contentEl);
            newsContainer.appendChild(wrapper);
        });
    } catch (error) {
        newsContainer.innerHTML = `<p class="empty-state">加载新闻失败：${error.message}</p>`;
    }
}

// Research page rendering
function buildYearFilter(years) {
    const select = document.getElementById('year-filter');
    if (!select) return;
    select.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = '全部';
    select.appendChild(allOption);

    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        select.appendChild(option);
    });
}

function applyYearFilter(selectedYear) {
    const sections = document.querySelectorAll('.year-section');
    sections.forEach(section => {
        const year = section.dataset.year;
        const papers = section.querySelectorAll('.paper-item');

        let visibleCount = 0;
        papers.forEach(paper => {
            const matches = selectedYear === 'all' || paper.dataset.year === selectedYear;
            paper.style.display = matches ? 'block' : 'none';
            if (matches) visibleCount += 1;
        });

        section.style.display = visibleCount ? 'flex' : 'none';
    });
}

async function loadResearchPage() {
    const papersContainer = document.getElementById('papers-list');
    if (!papersContainer) return;

    try {
        const papers = await fetchData('research.json');
        papersContainer.innerHTML = '';

        if (!papers.length) {
            papersContainer.innerHTML = '<p class="empty-state">暂无论文记录。</p>';
            return;
        }

        const grouped = papers.reduce((acc, paper) => {
            const year = paper.date && !Number.isNaN(new Date(paper.date).getFullYear())
                ? String(new Date(paper.date).getFullYear())
                : '未注明年份';
            acc[year] = acc[year] || [];
            acc[year].push(paper);
            return acc;
        }, {});

        const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
        buildYearFilter(years);

        years.forEach(year => {
            const section = document.createElement('div');
            section.className = 'year-section';
            section.dataset.year = year;

            const heading = document.createElement('h2');
            heading.className = 'year-heading';
            heading.textContent = year;

            section.appendChild(heading);

            grouped[year].forEach(paper => {
                const item = document.createElement('div');
                item.className = 'paper-item';
                item.dataset.year = year;

                const header = document.createElement('div');
                header.className = 'paper-header';

                const title = document.createElement('h3');
                title.className = 'paper-title';
                title.textContent = paper.title;

                header.appendChild(title);

                const venue = document.createElement('p');
                venue.className = 'paper-venue';
                venue.textContent = paper.venue ? `会议/期刊：${paper.venue}` : '会议/期刊：待更新';

                const authors = document.createElement('p');
                authors.className = 'paper-authors';
                authors.textContent = paper.authors;

                const date = document.createElement('p');
                date.className = 'paper-abstract';
                date.textContent = paper.date ? `日期：${formatDisplayDate(paper.date)}` : '日期：待更新';

                const footer = document.createElement('div');
                footer.className = 'paper-footer';
                if (paper.link) {
                    footer.appendChild(createLinkButton('View Paper', paper.link));
                }

                item.append(header, venue, authors, date, footer);
                section.appendChild(item);
            });

            papersContainer.appendChild(section);
        });

        const filter = document.getElementById('year-filter');
        if (filter) {
            filter.addEventListener('change', (event) => {
                applyYearFilter(event.target.value);
            });
        }
    } catch (error) {
        papersContainer.innerHTML = `<p class="empty-state">加载论文失败：${error.message}</p>`;
    }
}

// Projects page rendering
async function loadProjectsPage() {
    const projectsContainer = document.getElementById('projects-list');
    if (!projectsContainer) return;

    try {
        const projects = await fetchData('projects.json');
        projectsContainer.innerHTML = '';

        if (!projects.length) {
            projectsContainer.innerHTML = '<p class="empty-state">暂无研究成果。</p>';
            return;
        }

        projects.forEach(project => {
            const row = document.createElement('div');
            row.className = 'project-row';

            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'project-row-image';
            const placeholder = document.createElement('div');
            placeholder.className = 'project-image-placeholder';
            placeholder.textContent = project.logo || project.name.slice(0, 2);
            imageWrapper.appendChild(placeholder);

            const content = document.createElement('div');
            content.className = 'project-row-content';

            const title = document.createElement('h3');
            title.textContent = project.name;
            const desc = document.createElement('p');
            desc.textContent = project.description || '项目简介即将更新。';

            content.append(title, desc);

            if (project.link) {
                content.appendChild(createLinkButton('了解更多 →', project.link, 'project-row-link'));
            }

            row.append(imageWrapper, content);
            projectsContainer.appendChild(row);
        });
    } catch (error) {
        projectsContainer.innerHTML = `<p class="empty-state">加载研究成果失败：${error.message}</p>`;
    }
}

// Team page rendering
function buildAwardsList(text) {
    if (!text) return [];
    const parts = text
        .replace(/\n/g, '，')
        .split(/[,，；;]+/)
        .map(item => item.trim())
        .filter(Boolean);
    return parts.slice(0, 3);
}

function renderTeamCategory(container, members) {
    container.innerHTML = '';
    if (!members.length) {
        container.innerHTML = '<p class="empty-state">暂无成员。</p>';
        return;
    }

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';

        card.appendChild(createPlaceholderAvatar(member.name, member.photo));

        const name = document.createElement('h3');
        name.className = 'team-name';
        name.textContent = member.name;

        const role = document.createElement('p');
        role.className = 'team-role';
        const roleText = [member.title, member.joined].filter(Boolean).join(' | ');
        role.textContent = roleText || '成员';

        const bio = document.createElement('p');
        bio.className = 'team-bio';
        bio.textContent = member.bio || '简介待更新。';

        card.append(name, role, bio);

        const awards = buildAwardsList(member.awards);
        if (awards.length) {
            const awardsWrapper = document.createElement('div');
            awardsWrapper.className = 'team-awards';
            const label = document.createElement('h4');
            label.textContent = '曾获奖项：';

            const list = document.createElement('ul');
            awards.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                list.appendChild(li);
            });

            awardsWrapper.append(label, list);
            card.appendChild(awardsWrapper);
        }

        if (member.email) {
            const email = document.createElement('p');
            email.className = 'team-email';
            email.textContent = member.email;
            card.appendChild(email);
        }

        if (member.homepage) {
            const links = document.createElement('div');
            links.className = 'team-links';
            links.appendChild(createLinkButton('个人主页', member.homepage, 'homepage-btn'));
            card.appendChild(links);
        }

        container.appendChild(card);
    });
}

async function loadTeamPage() {
    const facultyContainer = document.getElementById('faculty-list');
    const studentContainer = document.getElementById('student-list');
    if (!facultyContainer || !studentContainer) return;

    try {
        const team = await fetchData('team.json');
        renderTeamCategory(facultyContainer, team.faculty || []);
        renderTeamCategory(studentContainer, team.students || []);
    } catch (error) {
        facultyContainer.innerHTML = `<p class="empty-state">加载团队成员失败：${error.message}</p>`;
        studentContainer.innerHTML = '';
    }
}

function initPageData() {
    const page = document.body.dataset.page;
    switch (page) {
        case 'news':
            loadNewsPage();
            break;
        case 'research':
            loadResearchPage();
            break;
        case 'projects':
            loadProjectsPage();
            break;
        case 'team':
            loadTeamPage();
            break;
        default:
            break;
    }
}

document.addEventListener('DOMContentLoaded', initPageData);
