// src/lib/store/appStore.ts
import { writable } from 'svelte/store';

export interface Position {
  x: number;
  y: number;
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: Position;
  component: string;
  props?: Record<string, any>;
}

// Helper function to center a window on the screen
function centerWindow(windowId: string) {
  // Set default window sizes (can be adjusted as needed)
  const windowSizes = {
    'terminal': { width: 1100, height: 700 },
    'photos': { width: 700, height: 500 },
    'about-txt': { width: 600, height: 450 },
    'default': { width: 600, height: 450 }
  };
  
  // Get window size
  const size = windowSizes[windowId] || windowSizes['default'];
  
  // Calculate viewport dimensions
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  
  // Calculate center position
  const x = Math.max(0, Math.floor((viewportWidth - size.width) / 2));
  const y = Math.max(0, Math.floor((viewportHeight - size.height) / 2) - 20); // Slight offset to account for top bar
  
  return { x, y };
}

// Initial window states
const initialWindows: WindowState[] = [
  {
    id: 'terminal',
    title: 'Terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: centerWindow('terminal'),
    component: 'TerminalApp'
  }
];

// Create the store
function createWindowStore() {
  const { subscribe, update, set } = writable<WindowState[]>(initialWindows);
  
  return {
    subscribe,
    
    openWindow: (id: string, component: string, title: string, props?: Record<string, any>) => {
      update(windows => {
        // Check if window already exists
        const existingWindow = windows.find(w => w.id === id);
        
        if (existingWindow) {
          // If window exists, just open it and bring to front
          const maxZ = Math.max(...windows.map(w => w.zIndex)) + 1;
          return windows.map(w => 
            w.id === id
              ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ }
              : w
          );
        } else {
          // Create new window
          const maxZ = windows.length ? Math.max(...windows.map(w => w.zIndex)) + 1 : 1;
          
          // Center the window on the screen
          const position = centerWindow(id);
          
          const newWindow: WindowState = {
            id,
            title,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZ,
            position,
            component,
            props
          };
          
          return [...windows, newWindow];
        }
      });
    },
    
    closeWindow: (id: string) => {
      update(windows => 
        windows.map(w => w.id === id ? { ...w, isOpen: false } : w)
      );
    },
    
    minimizeWindow: (id: string) => {
      update(windows => 
        windows.map(w => w.id === id ? { ...w, isMinimized: true } : w)
      );
    },
    
    maximizeWindow: (id: string) => {
      update(windows => 
        windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
      );
    },
    
    bringToFront: (id: string) => {
      update(windows => {
        const maxZ = Math.max(...windows.map(w => w.zIndex)) + 1;
        return windows.map(w => w.id === id ? { ...w, zIndex: maxZ } : w);
      });
    },
    
    updatePosition: (id: string, position: Position) => {
      update(windows => 
        windows.map(w => w.id === id ? { ...w, position } : w)
      );
    }
  };
}

export const windowStore = createWindowStore();