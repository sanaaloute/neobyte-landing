# Troubleshooting Guide

## Blank Page Issues

### 1. Check Browser Console
Open your browser's developer console (F12) and check for JavaScript errors.

### 2. Verify Dependencies
Make sure all dependencies are installed:
```bash
cd frontend
npm install
```

### 3. Check if Dev Server is Running
The dev server should show:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### 4. Clear Cache and Rebuild
```bash
cd frontend
rm -rf node_modules .vite dist
npm install
npm run dev
```

### 5. Check Path Aliases
Make sure `vite.config.ts` has the correct path alias:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

### 6. Verify TypeScript Config
Check `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 7. Common Issues

#### Import Errors
- Make sure all imports use correct paths
- Check that `@/` alias is working (should resolve to `src/`)

#### CSS Not Loading
- Verify `index.css` is imported in `main.tsx`
- Check that TailwindCSS is configured in `tailwind.config.js`

#### Component Errors
- Check browser console for specific error messages
- Verify all components are exported correctly
- Make sure React Router is properly set up

### 8. Test Minimal App
Try replacing `App.tsx` temporarily with:
```tsx
function App() {
  return <div>Hello World</div>
}
export default App
```

If this works, the issue is in one of your components.

### 9. Check Network Tab
Open browser DevTools → Network tab and verify:
- All files are loading (no 404 errors)
- CSS files are loading
- JavaScript bundles are loading

### 10. Port Conflicts
If port 3000 is in use, Vite will try the next available port. Check the terminal output for the actual URL.




