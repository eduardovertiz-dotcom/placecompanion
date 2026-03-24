'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { PROPERTY_CONFIGS } from '@/lib/propertyConfigs'

type Skin = 'dark' | 'light' | 'bright'

interface Props {
  propertyId: string
  children: React.ReactNode
}

interface ThemeContextValue {
  skin: Skin
  cycle: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  skin: 'dark',
  cycle: () => {}
})

export function useTheme() {
  return useContext(ThemeContext)
}

function getSkinCSS(skin: Skin, accentColor: string, accentHover: string): string {
  const skins = {
    dark: `
      --pc-bg-primary: #080706;
      --pc-bg-secondary: #0F0D0B;
      --pc-bg-elevated: #1A1715;
      --pc-bg-input: #1F1C19;
      --pc-text-primary: #FFFFFF;
      --pc-text-secondary: #A8A099;
      --pc-text-muted: #6B6560;
      --pc-border: rgba(232,227,220,0.06);
    `,
    light: `
      --pc-bg-primary: #FFFFFF;
      --pc-bg-secondary: #F7F5F2;
      --pc-bg-elevated: #EFEDE9;
      --pc-bg-input: #E8E5E1;
      --pc-text-primary: #1A1A1A;
      --pc-text-secondary: #6B6560;
      --pc-text-muted: #9A9490;
      --pc-border: rgba(0,0,0,0.08);
    `,
    bright: `
      --pc-bg-primary: #FFFFFF;
      --pc-bg-secondary: #F0EDE8;
      --pc-bg-elevated: #E6E2DC;
      --pc-bg-input: #DEDAD4;
      --pc-text-primary: #000000;
      --pc-text-secondary: #3A3A3A;
      --pc-text-muted: #6B6560;
      --pc-border: rgba(0,0,0,0.12);
    `
  }
  return `
    .pc-theme {
      ${skins[skin]}
      --pc-accent: ${accentColor};
      --pc-accent-hover: ${accentHover};
    }
  `
}

export default function ThemeProvider({ propertyId, children }: Props) {
  const config = PROPERTY_CONFIGS[propertyId] || PROPERTY_CONFIGS['demo']

  const [skin, setSkin] = useState<Skin>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pc_theme') as Skin
      if (saved === 'dark' || saved === 'light' || saved === 'bright') return saved
    }
    return 'dark'
  })

  useEffect(() => {
    localStorage.setItem('pc_theme', skin)
  }, [skin])

  const cycle = () => {
    setSkin(prev => prev === 'dark' ? 'light' : prev === 'light' ? 'bright' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ skin, cycle }}>
      <div className="pc-theme" style={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: '1', minHeight: '0' }}>
        <style dangerouslySetInnerHTML={{ __html: getSkinCSS(skin, config.accentColor, config.accentHover) }} />
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
