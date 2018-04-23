
// Import each public component
import Window from './components/Window'
import View from './components/View'

// Export them
export Window
export View

// Apply default theme
import DarkTheme from './theme/DarkTheme'
View.defaultTheme = DarkTheme
