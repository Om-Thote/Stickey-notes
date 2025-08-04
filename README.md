# 📝 Interactive Notes Dashboard

A beautiful, interactive notes application built with React, TypeScript, and Framer Motion. Features draggable notes, transparency controls, and a modern glass-morphism design.

## ✨ Features

- **🎯 Draggable Notes**: Smooth drag-and-drop functionality with Framer Motion
- **🎨 Transparency Control**: Adjustable opacity slider (10-100%) for the entire interface
- **📌 Sticky Notes Style**: Overlapping, repositionable note cards
- **💾 Local Storage**: Automatic saving and loading of notes
- **🎭 Glass Morphism**: Modern UI with backdrop blur effects
- **📱 Responsive Design**: Works on desktop and mobile devices
- **⚡ Real-time Updates**: Instant note creation, editing, and delete

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Storage**: LocalStorage API

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/interactive-notes-dashboard.git
   cd interactive-notes-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 Usage

1. **Add Notes**: Click the "+" button to create a new note
2. **Drag Notes**: Click and drag any note to reposition it
3. **Edit Notes**: Click on a note to edit its content
4. **Delete Notes**: Use the delete button on each note
5. **Adjust Transparency**: Use the slider to make the interface more or less transparent

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AddButton.tsx          # Add note button component
│   ├── AddNoteCard.tsx        # New note creation form
│   ├── Card.tsx               # Individual note card with drag functionality
│   ├── Dashboard.tsx          # Main dashboard container
│   ├── EmptyState.tsx         # Empty state when no notes exist
│   └── OpacitySlider.tsx      # Transparency control slider
├── hooks/
│   └── useNotes.tsx           # Custom hook for notes management
├── types/
│   └── Note.ts                # TypeScript type definitions
└── App.tsx                    # Root application component
```

## 🎨 Key Features Explained

### Draggable Notes

- Uses Framer Motion's `motion.div` with `drag` prop
- Smooth animations and constraints
- Position persistence in localStorage

### Transparency Control

- Global opacity control (10-100%)
- Affects entire interface including background
- Allows users to see desktop background

### Smart Positioning

- Random initial positioning for new notes
- Collision avoidance algorithm
- Responsive positioning based on screen size

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide React](https://lucide.dev/) for beautiful icons
