# @votekio/3d-ui

A beautiful 3D-styled UI component library built with React and TailwindCSS. Inspired by shadcn/ui but with a unique 3D aesthetic featuring depth, shadows, and interactive press effects.

🌐 **[Live Demo](https://3d-ui-tawny.vercel.app/)** | 📦 **[npm](https://www.npmjs.com/package/@votekio/3d-ui)** | 📖 **[GitHub](https://github.com/rintran720/3d-ui)**

## ✨ Features

- 🎨 **3D Visual Effects** - Realistic depth and shadow effects
- 🖱️ **Interactive Feedback** - Press animations and hover states
- 🌈 **Multiple Variants** - Primary, Secondary, Accent, Ghost, Danger, Glass
- 📏 **Flexible Sizes** - SM, MD, LG, XL, and Icon sizes
- 🎛️ **Customizable Depth** - Flat, Shallow, Normal, Deep options
- ✨ **Glow Effects** - Optional glow on hover
- ♿ **Accessible** - Keyboard navigation and focus states
- 🌙 **Theme System** - 5 pre-built themes + custom theme support
- 🖥️ **SSR Support** - Works with Next.js, Remix, Gatsby, etc.
- 📖 **Storybook** - Interactive documentation and playground

## 📦 Components

| Component          | Description                             |
| ------------------ | --------------------------------------- |
| **Button**         | 3D buttons with press effects           |
| **Accordion**      | Collapsible sections                    |
| **Dialog**         | Modal dialogs with portal               |
| **Alert**          | Alert messages with icons               |
| **TextField**      | Text inputs with 3D styling             |
| **TextArea**       | Multiline text inputs                   |
| **Badge**          | Status badges and labels                |
| **Card**           | Container cards with 3D effects         |
| **Switch**         | Toggle switches                         |
| **Checkbox**       | Checkbox inputs                         |
| **Tabs**           | Tab navigation                          |
| **Select**         | Dropdown select menus                   |
| **Progress**       | Linear and circular progress indicators |
| **Avatar**         | User avatars with status indicators     |
| **Skeleton**       | Loading placeholders                    |
| **Tooltip**        | Hover tooltips                          |
| **Slider**         | Range sliders                           |
| **RadioGroup**     | Radio button groups                     |
| **Toast**          | Toast notifications                     |
| **DropdownMenu**   | Context menus and dropdowns             |
| **Separator**      | Visual dividers                         |
| **Label**          | Form labels                             |
| **Toggle**         | Toggle buttons                          |
| **Popover**        | Popover dialogs                         |
| **Sheet**          | Side sheets and drawers                 |
| **Collapsible**    | Collapsible content sections            |
| **HoverCard**      | Hover-triggered cards                   |
| **ScrollArea**     | Custom scrollable areas                 |
| **AspectRatio**    | Maintain aspect ratios                  |
| **Breadcrumb**     | Navigation breadcrumbs                  |
| **Command**        | Command palette and search              |
| **Menubar**        | Application menu bars                   |
| **NavigationMenu** | Navigation menus with dropdowns         |
| **Table**          | Data tables                             |
| **Pagination**     | Page navigation                         |
| **Calendar**       | Date calendar picker                    |
| **DatePicker**     | Date input with calendar                |
| **Form**           | Form components and validation          |
| **ThemeProvider**  | Theme context provider                  |

## 🚀 Getting Started

### Installation

```bash
npm install @votekio/3d-ui
# or
yarn add @votekio/3d-ui
# or
pnpm add @votekio/3d-ui
```

### Setup TailwindCSS

Add the library to your `tailwind.config.js` content paths:

```js
module.exports = {
  content: [
    // ... your paths
    "./node_modules/@votekio/3d-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of config
};
```

### Import Styles

Import the library styles in your app:

```tsx
import "@votekio/3d-ui/dist/styles.css";
```

### Use Components

```tsx
import { Button, ThemeProvider } from "@votekio/3d-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Button variant="primary" size="lg">
        Click Me!
      </Button>
    </ThemeProvider>
  );
}
```

## 🎨 Theme System (CSS-First)

The library uses **CSS Variables** for theming, optimized for **Server Side Rendering**.

### Method 1: CSS Class (Recommended for SSR)

Add a class or data attribute to the `<html>` tag:

```html
<!-- Using class -->
<html class="theme-dark">
  <!-- Or data attribute -->
  <html data-theme="dark">
    <!-- Or data-theme with Next.js -->
    <html data-theme="ocean"></html>
  </html>
</html>
```

### Available Themes

- `theme-dark` / `data-theme="dark"` - Dark theme (default)
- `theme-light` / `data-theme="light"` - Light theme
- `theme-ocean` / `data-theme="ocean"` - Cyan/teal
- `theme-sunset` / `data-theme="sunset"` - Orange/pink
- `theme-forest` / `data-theme="forest"` - Green

### Customize Colors with CSS

```css
/* Override primary color */
:root {
  --color-primary-500: #ef4444; /* Red */
}

/* Or use utility class */
<html class="theme-dark primary-rose">

/* Available color classes */
.primary-blue, .primary-rose, .primary-violet, .primary-emerald...
.secondary-purple, .secondary-pink, .secondary-teal...
.accent-green, .accent-yellow, .accent-orange...
```

### Full Color Override (CSS)

```css
:root {
  /* Primary - Custom Red */
  --color-primary-50: #fef2f2;
  --color-primary-100: #fee2e2;
  --color-primary-200: #fecaca;
  --color-primary-300: #fca5a5;
  --color-primary-400: #f87171;
  --color-primary-500: #ef4444;
  --color-primary-600: #dc2626;
  --color-primary-700: #b91c1c;
  --color-primary-800: #991b1b;
  --color-primary-900: #7f1d1d;
  --color-primary-950: #450a0a;

  /* Secondary - Custom Purple */
  --color-secondary-500: #8b5cf6;

  /* Accent - Custom Teal */
  --color-accent-500: #14b8a6;
}
```

### Method 2: ThemeProvider (Client-side)

If you need dynamic theme switching with JavaScript:

```tsx
import { ThemeProvider, useTheme } from "@votekio/3d-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeSwitcher() {
  const { themeName, setTheme, availableThemes } = useTheme();

  return (
    <select value={themeName} onChange={(e) => setTheme(e.target.value)}>
      {availableThemes.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
}
```

## 🖥️ Server Side Rendering (SSR)

The library is fully compatible with SSR frameworks like Next.js, Remix, and Gatsby.

### SSR Utilities

```tsx
import {
  isBrowser,
  isServer,
  useIsMounted,
  useLocalStorage,
  useWindowSize,
  usePrefersDarkMode,
} from "@votekio/3d-ui";

// Check environment
if (isBrowser) {
  // Client-side only code
}

// Hook to check if component mounted
function MyComponent() {
  const isMounted = useIsMounted();

  if (!isMounted) return <Skeleton />;

  return <div>{window.innerWidth}</div>;
}

// Safe localStorage hook
const [theme, setTheme] = useLocalStorage("theme", "dark");

// Window size hook (SSR-safe)
const { width, height } = useWindowSize();

// Dark mode preference detection
const prefersDark = usePrefersDarkMode();
```

### Next.js App Router

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "@votekio/3d-ui";

export function Providers({ children }) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
}
```

## 📚 Component Examples

### Button

```tsx
import { Button } from "@votekio/3d-ui";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="glass">Glass</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>Download</Button>

// Loading state
<Button isLoading>Loading</Button>
```

### TextField

```tsx
import { TextField, TextArea } from "@votekio/3d-ui";

<TextField
  label="Email"
  placeholder="you@example.com"
  leftElement={<MailIcon />}
  helperText="We'll never share your email"
  fullWidth
/>

<TextField
  label="Password"
  error="Password is required"
  isRequired
/>

<TextArea
  label="Message"
  placeholder="Enter your message..."
  resize
/>
```

### Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@votekio/3d-ui";

<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description here.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="ghost">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Alert

```tsx
import { Alert, AlertTitle, AlertDescription } from "@votekio/3d-ui";

<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an info alert.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Operation completed.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please check your input.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

### Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@votekio/3d-ui";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>;
```

### Calendar & DatePicker

```tsx
import { Calendar, DatePicker } from "@votekio/3d-ui";

// Calendar
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  showNavigation
/>

// DatePicker
<DatePicker
  label="Select Date"
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>
```

### Form

```tsx
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  TextField,
  Button,
} from "@votekio/3d-ui";

<Form onSubmit={handleSubmit}>
  <FormField name="email">
    <FormItem>
      <FormLabel>Email</FormLabel>
      <TextField type="email" placeholder="you@example.com" />
      <FormMessage />
    </FormItem>
  </FormField>
  <Button type="submit">Submit</Button>
</Form>;
```

### Pagination

```tsx
import { Pagination } from "@votekio/3d-ui";

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={setPage}
  showFirstLast
  showPrevNext
/>;
```

### Select

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@votekio/3d-ui";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>;
```

### DropdownMenu

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@votekio/3d-ui";

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Storybook development server
npm run dev

# Build the library
npm run build

# Build Storybook for production
npm run build:storybook
```

## 🚀 Deployment

### Deploy to Vercel

The project is configured to deploy Storybook to Vercel automatically.

#### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your repository
5. Vercel will automatically detect the configuration from `vercel.json`
6. Click "Deploy"

The `vercel.json` file is already configured with:

- Build command: `npm run build:storybook`
- Output directory: `storybook-static`
- Framework: Static Site

#### Manual Build & Deploy

```bash
# Build Storybook
npm run build:storybook

# The output will be in storybook-static/
# You can deploy this folder to any static hosting service
```

### Publish to npm

The library is configured to be published to npm.

#### Prerequisites

1. Create an npm account at [npmjs.com](https://www.npmjs.com/)
2. Login to npm via CLI:
   ```bash
   npm login
   ```

#### Build & Publish

```bash
# Build the library (this will also copy CSS files)
npm run build

# Verify the build output
ls dist/

# Publish to npm (this will run prepublishOnly script automatically)
npm publish

# For scoped packages, publish publicly:
npm publish --access public
```

#### Version Management

```bash
# Update version before publishing
npm version patch   # 0.1.0 -> 0.1.1
npm version minor   # 0.1.0 -> 0.2.0
npm version major   # 0.1.0 -> 1.0.0

# Then publish
npm publish --access public
```

#### What Gets Published

The following files are included in the npm package:

- `dist/` - Built JavaScript, TypeScript definitions, and CSS files
- `README.md` - Documentation
- `package.json` - Package metadata

The following are excluded (via `.npmignore`):

- Source files (`src/`)
- Storybook files
- Development configs
- Tests

#### After Publishing

Users can install and use the package:

```bash
npm install @votekio/3d-ui
```

```tsx
import { Button } from "@votekio/3d-ui";
import "@votekio/3d-ui/styles/globals.css";
```

## 📄 License

MIT © votekio
