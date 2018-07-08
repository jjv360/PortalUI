
// Export each public component
export { default as Canvas } from './components/Canvas'
export { default as Window } from './components/Window'
export { default as Background } from './components/Background'
export { default as Button } from './components/Button'
export { default as View } from './components/View'
export { default as SplitView } from './components/SplitView'
export { default as Label } from './components/Label'
export { default as NavigationBar } from './components/NavigationBar'

// Export layouts
export { default as VerticalFlexLayout } from './layouts/VerticalFlexLayout'

// Export themes
export { default as DarkTheme } from './themes/DarkTheme'
export { default as SepiaTheme } from './themes/SepiaTheme'

// Apply default theme
import View from './components/View'
import SepiaTheme from './themes/SepiaTheme'
View.defaultTheme = new SepiaTheme()
