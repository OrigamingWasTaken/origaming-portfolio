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

// Initial window states
const initialWindows: WindowState[] = [
  {
    id: 'terminal',
    title: 'Terminal',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 80, y: 40 },
    component: 'TerminalApp'
  }
];

// Create the store
function createWindowStore() {
  const { subscribe, update } = writable<WindowState[]>(initialWindows);
  
  return {
    subscribe,
    
    openWindow: (id: string, component: string, title: string, props?: Record<string, any>) => {
      update(windows => {
        // Check if window already exists
        const existingWindow = windows.find(w => w.id === id);
        
        if (existingWindow) {
          // If window exists, just open it and bring to front
          return windows.map(w => 
            w.id === id
              ? { ...w, isOpen: true, isMinimized: false, zIndex: Math.max(...windows.map(w => w.zIndex)) + 1 }
              : w
          );
        } else {
          // Create new window
          const maxZ = windows.length ? Math.max(...windows.map(w => w.zIndex)) : 0;
          
          // Set position at top of screen with slight horizontal offset
          const horizontalOffset = windows.length * 35 % 200;
          const newWindow: WindowState = {
            id,
            title,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZ + 1,
            position: { x: 100 + horizontalOffset, y: 40 },  // Fixed y position at top
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
        const maxZ = Math.max(...windows.map(w => w.zIndex));
        return windows.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
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