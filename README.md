# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML, CSS, and JavaScript. Features a clean design, smooth animations, and optimized performance.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops
- **Modern UI**: Clean, professional design with a soft color palette
- **Interactive Elements**: Hover micro-interactions, smooth transitions, and animated sections
- **Project Gallery**: Filterable project cards with modal detail views
- **Contact Form**: Integrated with Formspree for easy form submissions
- **Accessibility**: ARIA attributes, keyboard navigation, and screen reader support
- **Performance Optimized**: Lazy loading, deferred scripts, and GPU-friendly animations
- **Animated Background**: Subtle gradient animation that respects `prefers-reduced-motion`

## 📁 Project Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles with CSS custom properties
├── js/
│   └── script.js       # JavaScript for interactivity
└── README.md           # This file
```

## 🛠️ Build & Run

### Prerequisites
- A modern web browser
- Internet connection (for Font Awesome icons and placeholder images)

### Running Locally
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load and be fully functional

### Development
- Edit `index.html` for content changes
- Modify `css/styles.css` for styling updates
- Update `js/script.js` for functionality changes

## 🔧 Configuration

### Formspree Integration
1. Sign up for a free account at [Formspree](https://formspree.io/)
2. Create a new form and copy the form ID
3. Replace `your-form-id` in the `action` attribute of the contact form in `index.html`:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```

### Font Awesome Icons
1. Sign up for a free kit at [Font Awesome](https://fontawesome.com/)
2. Replace `your-fontawesome-kit.js` in the script tag at the bottom of `index.html`

### Customization
- **Colors**: Update CSS custom properties in `:root` in `styles.css`
- **Content**: Edit text and project data in `index.html` and `js/script.js`
- **Projects**: Modify the `projects` array in `js/script.js` to add/remove projects
- **Social Links**: Update footer social links in `index.html`

## 🎨 Design Decisions

- **Color Palette**: Soft, modern colors using CSS custom properties for easy theming
- **Typography**: Inter font for readability, with fallback fonts
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Animations**: CSS transitions and keyframes, respecting user preferences
- **Performance**: Minimal JavaScript, lazy loading, and optimized CSS

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management for modals
- High contrast mode support
- Reduced motion preferences respected

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔍 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🚀 Performance Features

- **Lazy Loading**: Images load only when needed
- **Deferred Scripts**: JavaScript loads after HTML parsing
- **Optimized CSS**: Minimal reflows and repaints
- **GPU Acceleration**: Transforms use hardware acceleration
- **Font Loading**: System fonts as fallbacks

## 📝 Extending the Site

### Adding New Sections
1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Add interactivity in `js/script.js` if needed

### Adding New Projects
Update the `projects` array in `js/script.js`:

```javascript
{
    id: 7,
    title: "New Project",
    description: "Description of the project",
    image: "path/to/image.jpg",
    tech: ["Tech1", "Tech2"],
    liveUrl: "https://live-demo.com",
    codeUrl: "https://github.com/username/repo",
    category: "web"
}
```

### Customizing Animations
Modify keyframes in `styles.css` and update JavaScript animation triggers in `script.js`.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using HTML, CSS, and JavaScript
