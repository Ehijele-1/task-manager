# Task Manager

A clean, dark-themed task manager built with vanilla HTML, CSS, and JavaScript. Add, edit, complete, filter, and delete tasks, with everything saved in your browser so nothing disappears on refresh.

##Live Link

myfirst-task-manager.netlify.app

## Features

- **Add tasks**: type a task and click **Add** (empty entries are ignored)
- **Edit tasks**: edit any task inline and save the change
- **Complete tasks**: tick the checkbox to mark a task done
- **Delete tasks**: remove a single task with one click
- **Filter tasks**: switch between **All**, **Completed**, and **Active**
- **Clear completed**: remove every finished task at once
- **Live counters**: Total, Completed, and Active counts update automatically
- **Persistent storage**: tasks are saved to `localStorage`, so they survive page reloads
- **Responsive layout**: works on mobile and desktop

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid, media queries)
- Vanilla JavaScript (DOM manipulation, event delegation, Web Storage API)

No frameworks, libraries, or build tools required.

## Project Structure

```
task-manager/
├── index.html          # App markup
├── task-manager.css    # Styling (purple dark theme)
├── task-manager.js     # App logic
└── README.md
```

## Getting Started

1. Clone or download this repository:
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```
2. Open `index.html` in your browser. That's it, no install or build step.

## How It Works

- **State**: tasks live in an array of objects shaped like `{ id, task, completed }`, where `id` is generated with `Date.now()`.
- **Persistence**: the array is serialized to `localStorage` under the key `taskss` after every change, and loaded again on startup.
- **Rendering**: a `display()` function re-renders the list from whatever array it receives, which is how the filters work (it is passed the full list or a filtered copy).
- **Event delegation**: a single listener on the `<ul>` handles checkbox changes plus the Edit, Save, and Delete buttons, so it keeps working for tasks added later.
- **Counters**: `countTasks()` recalculates Total, Completed, and Active whenever the task list changes.

## Usage

| Action | How |
| --- | --- |
| Add a task | Type in the input and click **Add** |
| Complete a task | Tick its checkbox |
| Edit a task | Click **Edit**, change the text, click **Save** |
| Delete a task | Click **Delete** |
| Filter | Click **All**, **Completed**, or **Active** |
| Clear finished tasks | Click **Clear completed** |

## Customization

The theme is controlled by CSS variables at the top of `task-manager.css`:

```css
:root {
    --bg: #07020b;
    --surface: #0f0713;
    --muted: #e9e0ff;
    --accent: #9b5cff;
    --accent-2: #6e3cff;
}
```

Change these values to give the app a new look.

## Known Limitations and Future Improvements

- Pressing **Enter** doesn't add a task yet (only the Add button does)
- Task text is inserted via `innerHTML`, so it should be sanitized (or switched to `textContent`) before using this with untrusted input
- The active filter button isn't visually highlighted yet (the `.active` style exists in the CSS but isn't applied by the JS)
- The current filter resets after adding, editing, or deleting a task
- Ideas: due dates, priorities, drag-and-drop reordering, dark/light toggle

## License

This project is open source and available under the [MIT License](LICENSE).
