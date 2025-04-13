// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
      // interface Error {}
      // interface Locals {}
      // interface PageData {}
      // interface Platform {}
    }
  }
  
  // This adds TypeScript support for importing CSS modules
  declare module '*.css' {
    const content: string;
    export default content;
  }
  
  // This adds TypeScript support for importing images
  declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  export {};