import { useState, useRef, useCallback } from 'react'
import { formatInputValue } from '../hooks'

export default function InputField({
  label,
  value,
  onChange,
  prefix = '',
  suffix = '',
  chips = [],
  chipFormatter,
  min = 0,
  max = Infinity,
  error,
}) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const hasValue = value !== '' && value !== 0 && value !== undefined

  const displayValue = useCallback(() => {
    if (focused) {
      // show raw digits while editing
      return value ? String(value) : ''
    }
    if (!hasValue) return ''
    return formatInputValue(String(value))
  }, [value, focused, hasValue])

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '')
    if (raw === '') { onChange(0); return }
    const num = parseFloat(raw)
    if (!isNaN(num) && num <= max) onChange(num)
    else if (!isNaN(num) && num > max) onChange(max)
  }

  const handleBlur = () => {
    setFocused(false)
    if (value < min) onChange(min)
  }

  const isError = error || (hasValue && value < min)

  return (
    <div className="mb-6 last:mb-0">
      {/* Input wrapper */}
      <div
        className="relative cursor-text"
        onClick={() => inputRef.current?.focus()}
        style={{
          background: focused ? 'var(--surface)' : 'var(--input-bg)',
          borderRadius: 12,
          border: `2px solid ${isError ? 'var(--error)' : focused ? 'var(--accent)' : 'transparent'}`,
          transition: 'border-color 200ms, background 200ms, box-shadow 200ms',
          boxShadow: focused ? '0 0 0 3px rgba(5,150,105,0.1)' : 'none',
        }}
      >
        {/* Floating label */}
        <label
          style={{
            position: 'absolute',
            left: prefix ? 44 : 16,
            top: focused || hasValue ? 10 : 20,
            fontSize: focused || hasValue ? 11 : 15,
            fontWeight: 500,
            color: isError
              ? 'var(--error)'
              : focused
                ? 'var(--accent)'
                : 'var(--text-tertiary)',
            letterSpacing: focused || hasValue ? '0.06em' : '0',
            textTransform: focused || hasValue ? 'uppercase' : 'none',
            transition: 'all 200ms cubic-bezier(0.16,1,0.3,1)',
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          {label}
        </label>

        {/* Prefix */}
        {prefix && (
          <span
            style={{
              position: 'absolute',
              left: 16,
              bottom: 14,
              fontSize: 18,
              fontWeight: 600,
              color: focused ? 'var(--text-primary)' : 'var(--text-tertiary)',
              transition: 'color 200ms',
              lineHeight: 1,
            }}
          >
            {prefix}
          </span>
        )}

        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={displayValue()}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          style={{
            width: '100%',
            height: 60,
            paddingTop: 22,
            paddingBottom: 8,
            paddingLeft: prefix ? 44 : 16,
            paddingRight: suffix ? 44 : 16,
            fontSize: 18,
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontVariantNumeric: 'tabular-nums',
          }}
        />

        {/* Suffix */}
        {suffix && (
          <span
            style={{
              position: 'absolute',
              right: 16,
              bottom: 14,
              fontSize: 15,
              fontWeight: 600,
              color: focused ? 'var(--accent)' : 'var(--text-tertiary)',
              transition: 'color 200ms',
              lineHeight: 1,
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {/* Error text */}
      {isError && (
        <p style={{ fontSize: 12, color: 'var(--error)', marginTop: 4, paddingLeft: 4 }}>
          Please enter a valid value
        </p>
      )}

      {/* Chip row */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {chips.map((chip) => {
            const isActive = value === chip
            return (
              <button
                key={chip}
                onClick={() => onChange(chip)}
                style={{
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'var(--font-sans)',
                  borderRadius: 8,
                  border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                  background: isActive ? 'var(--accent-light)' : 'var(--surface)',
                  color: isActive ? 'var(--accent-dark)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                  transform: isActive ? 'scale(1)' : 'scale(1)',
                  minHeight: 36,
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)' }}
                onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                {chipFormatter ? chipFormatter(chip) : chip}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
