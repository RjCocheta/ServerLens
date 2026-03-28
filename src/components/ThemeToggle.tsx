import { useEffect, useState } from 'react';
import {AnimatePresence, motion} from "motion/react"

type ThemeMode = 'light' | 'dark' | 'auto'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto'
  }

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored
  }

  return 'auto'
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', mode)
  }

  document.documentElement.style.colorScheme = resolved
}

const ButtonTextVariants = {
  initial: { opacity: 0, y: -20,scale:0.7 },
  normal: { opacity: 1, y: 0, scale:1},
  exit: { opacity: 0, y: 20 ,scale:0.5}
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto')
  const [isHovering, setisHovering] = useState<boolean>(false)

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') {
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('auto')

    media.addEventListener('change', onChange)
    return () => {
      media.removeEventListener('change', onChange)
    }
  }, [mode])

  function toggleMode() {
    const nextMode: ThemeMode =
      mode === 'light' ? 'dark' : mode === 'dark' ? 'auto' : 'light'
    setMode(nextMode)
    applyThemeMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  const label =
    mode === 'auto'
      ? 'Theme mode: auto (system). Click to switch to light mode.'
      : `Theme mode: ${mode}. Click to switch mode.`

  return (
    <motion.div onHoverStart={()=>{setisHovering(true)}} onHoverEnd={()=>{setisHovering(false)}}>
      <motion.button
        type="button"
        onClick={toggleMode}
        aria-label={label}
        title={label}
        initial={{ scale: 0.8 }}
        animate={{ scale: isHovering? 1.05 : 1 }}
        
        transition={{ type: "spring", duration: 0.1, bounce: 0.3 }}
        className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)]"
      >
        <AnimatePresence mode='popLayout'>
          <motion.p variants={ButtonTextVariants} initial={"initial"} animate={"normal"} exit={"exit"} key={mode} transition={{ease:"easeOut",duration:0.15,delay:0.05}}>
            {mode === 'auto' ? 'Auto' : mode === 'dark' ? 'Dark' : 'Light'}
          </motion.p>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
