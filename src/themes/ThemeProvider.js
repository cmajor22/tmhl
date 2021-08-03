import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const themes = {
  normal: responsiveFontSizes(createMuiTheme({
      palette: {
          primary: {
            main: '#3f51b5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#3d5afe',
            contrastText: '#ffffff'
          },
          titleBar: {
            main: '#eeeeee',
            contrastText: '#ffffff',
          },
          error: {
            main: red.A400,
          },
          background: {
            default: '#fafafa',
            light: '#f5f5f5',
            medium: '#eeeeee',
            dark: '#e0e0e0',
          },
          particles: {
            background: '#fafafa',
            lines: '#000000',
            dots: '00ffff'
          }
      }
  })),
  dark: responsiveFontSizes(createMuiTheme({
      palette: {
        type: 'dark',
        primary: {
          main: '#424242',
          light: '#6d6d6d',
          dark: '#1b1b1b',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#1565c0',
          light: '#5e92f3',
          dark: '#003c8f',
          contrastText: '#ffffff',
        },
        titleBar: {
          main: '#555555',
          contrastText: '#ffffff',
        },
        error: {
          main: red.A400,
        },
        background: {
          default: '#1a2327',
          light: '#1a2327',
          medium: '#263238',
          dark: '#1a2327',
        },
        particles: {
          background: '#1b1b1b',
          lines: '#ffffff',
          dots: '#ff0000'
        }
      },
  }))
}

export const CustomThemeContext = React.createContext()

const CustomThemeProvider = (props) => {
  const { children } = props
  // Saved and init value
  const activeTheme = localStorage.getItem('appTheme') || 'dark'
  const [themeName, _setThemeName] = useState(activeTheme)

  // Handle Theme Toggles
  const setThemeName = (name) => {
    localStorage.setItem('appTheme', name)
    _setThemeName(name)
  }

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeProvider