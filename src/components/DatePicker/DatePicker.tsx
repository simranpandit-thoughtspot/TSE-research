import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './DatePicker.module.css';

export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';

export interface DatePickerProps {
  /**
   * Selected date
   */
  value?: Date | null;
  /**
   * Change handler
   */
  onChange: (date: Date | null) => void;
  /**
   * Date format
   * @default 'MM/DD/YYYY'
   */
  format?: DateFormat;
  /**
   * Label text
   */
  label?: string;
  /**
   * Placeholder text
   * @default 'Select date'
   */
  placeholder?: string;
  /**
   * Error state
   * @default false
   */
  hasError?: boolean;
  /**
   * Helper or error text
   */
  helperText?: string;
  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;
  /**
   * Minimum selectable date
   */
  minDate?: Date;
  /**
   * Maximum selectable date
   */
  maxDate?: Date;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Input ID
   */
  id?: string;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type CalendarView = 'days' | 'months' | 'years';

/**
 * Format date to string based on format
 */
function formatDate(date: Date | null, format: DateFormat): string {
  if (!date) return '';
  
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear().toString();
  
  switch (format) {
    case 'DD/MM/YYYY': return `${d}/${m}/${y}`;
    case 'YYYY-MM-DD': return `${y}-${m}-${d}`;
    case 'MM/DD/YYYY':
    default: return `${m}/${d}/${y}`;
  }
}

/**
 * Parse string to date based on format
 */
function parseDate(value: string, format: DateFormat): Date | null {
  if (!value) return null;
  
  let parts: string[];
  let d: number, m: number, y: number;
  
  switch (format) {
    case 'DD/MM/YYYY':
      parts = value.split('/');
      if (parts.length !== 3) return null;
      d = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10) - 1;
      y = parseInt(parts[2], 10);
      break;
    case 'YYYY-MM-DD':
      parts = value.split('-');
      if (parts.length !== 3) return null;
      y = parseInt(parts[0], 10);
      m = parseInt(parts[1], 10) - 1;
      d = parseInt(parts[2], 10);
      break;
    case 'MM/DD/YYYY':
    default:
      parts = value.split('/');
      if (parts.length !== 3) return null;
      m = parseInt(parts[0], 10) - 1;
      d = parseInt(parts[1], 10);
      y = parseInt(parts[2], 10);
  }
  
  const date = new Date(y, m, d);
  if (isNaN(date.getTime())) return null;
  return date;
}

/**
 * Get days in month grid (including prev/next month days)
 */
function getCalendarDays(year: number, month: number): { date: Date; isCurrentMonth: boolean }[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  
  const days: { date: Date; isCurrentMonth: boolean }[] = [];
  
  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }
  
  // Next month days (fill to 42 = 6 weeks)
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }
  
  return days;
}

/**
 * Check if two dates are the same day
 */
function isSameDay(a: Date | null, b: Date): boolean {
  if (!a) return false;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

/**
 * Check if date is today
 */
function isToday(date: Date): boolean {
  return isSameDay(new Date(), date);
}

/**
 * Calendar icon
 */
const CalendarIcon: React.FC = () => (
  <svg className={styles.calendarIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 6H14" stroke="currentColor" strokeWidth="1.5" />
    <path d="M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/**
 * Navigation icons
 */
const ChevronLeftIcon: React.FC = () => (
  <svg className={styles.navIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg className={styles.navIcon} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * DatePicker Component
 * 
 * A date selection input with calendar dropdown.
 * 
 * **Formats:**
 * - `MM/DD/YYYY` - US format (default)
 * - `DD/MM/YYYY` - European format
 * - `YYYY-MM-DD` - ISO format
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <DatePicker 
 *   value={date} 
 *   onChange={setDate} 
 *   label="Start Date"
 * />
 * 
 * // With validation
 * <DatePicker 
 *   value={date} 
 *   onChange={setDate}
 *   hasError={!date}
 *   helperText="Please select a date"
 * />
 * 
 * // With date range constraints
 * <DatePicker 
 *   value={date} 
 *   onChange={setDate}
 *   minDate={new Date()}
 *   maxDate={new Date(2025, 11, 31)}
 * />
 * ```
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  format = 'MM/DD/YYYY',
  label,
  placeholder = 'Select date',
  hasError = false,
  helperText,
  disabled = false,
  minDate,
  maxDate,
  className = '',
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(() => formatDate(value || null, format));
  const [viewDate, setViewDate] = useState(() => value || new Date());
  const [calendarView, setCalendarView] = useState<CalendarView>('days');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get year range for year picker (12 years centered around current view year)
  const getYearRange = useCallback((centerYear: number): number[] => {
    const startYear = Math.floor(centerYear / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  }, []);

  // Sync input value with prop
  useEffect(() => {
    setInputValue(formatDate(value || null, format));
  }, [value, format]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setCalendarView('days');
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const parsed = parseDate(newValue, format);
    if (parsed) {
      onChange(parsed);
      setViewDate(parsed);
    }
  };

  const handleInputBlur = () => {
    // Validate and format on blur
    if (inputValue) {
      const parsed = parseDate(inputValue, format);
      if (parsed) {
        setInputValue(formatDate(parsed, format));
      } else {
        setInputValue(formatDate(value || null, format));
      }
    }
  };

  const handleDayClick = useCallback((date: Date) => {
    onChange(date);
    setIsOpen(false);
    setCalendarView('days');
    setInputValue(formatDate(date, format));
  }, [onChange, format]);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handlePrevYearRange = () => {
    setViewDate(new Date(viewDate.getFullYear() - 12, viewDate.getMonth(), 1));
  };

  const handleNextYearRange = () => {
    setViewDate(new Date(viewDate.getFullYear() + 12, viewDate.getMonth(), 1));
  };

  const handleMonthClick = (monthIndex: number) => {
    setViewDate(new Date(viewDate.getFullYear(), monthIndex, 1));
    setCalendarView('days');
  };

  const handleYearClick = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setCalendarView('months');
  };

  const handleHeaderClick = () => {
    if (calendarView === 'days') {
      setCalendarView('months');
    } else if (calendarView === 'months') {
      setCalendarView('years');
    }
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const calendarDays = getCalendarDays(viewDate.getFullYear(), viewDate.getMonth());

  const inputClasses = [
    styles.input,
    hasError && styles.inputError,
    disabled && styles.inputDisabled,
  ].filter(Boolean).join(' ');

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      {label && <label htmlFor={id} className={styles.label}>{label}</label>}
      
      <div className={styles.inputWrapper}>
        <input
          ref={inputRef}
          type="text"
          id={id}
          className={inputClasses}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={hasError}
        />
        <button
          type="button"
          className={styles.calendarButton}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          tabIndex={-1}
          aria-label="Open calendar"
        >
          <CalendarIcon />
        </button>
        
        {isOpen && !disabled && (
          <div className={styles.calendar} role="dialog" aria-label="Date picker">
            {/* Days View */}
            {calendarView === 'days' && (
              <>
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={handlePrevMonth}
                    aria-label="Previous month"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    className={styles.headerButton}
                    onClick={handleHeaderClick}
                    aria-label="Select month and year"
                  >
                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={handleNextMonth}
                    aria-label="Next month"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
                
                <div className={styles.weekdays}>
                  {WEEKDAYS.map((day, i) => (
                    <span key={i} className={styles.weekday}>{day}</span>
                  ))}
                </div>
                
                <div className={styles.days}>
                  {calendarDays.map(({ date, isCurrentMonth }, i) => {
                    const selected = isSameDay(value || null, date);
                    const today = isToday(date);
                    const isDisabled = isDateDisabled(date);
                    
                    const dayClasses = [
                      styles.day,
                      !isCurrentMonth && styles.dayOtherMonth,
                      today && styles.dayToday,
                      selected && styles.daySelected,
                      isDisabled && styles.dayDisabled,
                    ].filter(Boolean).join(' ');
                    
                    return (
                      <button
                        key={i}
                        type="button"
                        className={dayClasses}
                        onClick={() => !isDisabled && handleDayClick(date)}
                        disabled={isDisabled}
                        tabIndex={-1}
                        aria-selected={selected}
                        aria-label={date.toDateString()}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Months View */}
            {calendarView === 'months' && (
              <>
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1))}
                    aria-label="Previous year"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    className={styles.headerButton}
                    onClick={handleHeaderClick}
                    aria-label="Select year"
                  >
                    {viewDate.getFullYear()}
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1))}
                    aria-label="Next year"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
                
                <div className={styles.monthsGrid}>
                  {MONTHS_SHORT.map((month, i) => {
                    const isSelected = !!value && value.getMonth() === i && value.getFullYear() === viewDate.getFullYear();
                    const isCurrent = new Date().getMonth() === i && new Date().getFullYear() === viewDate.getFullYear();

                    const monthClasses = [
                      styles.monthCell,
                      isSelected && styles.monthCellSelected,
                      isCurrent && styles.monthCellCurrent,
                    ].filter(Boolean).join(' ');

                    return (
                      <button
                        key={i}
                        type="button"
                        className={monthClasses}
                        onClick={() => handleMonthClick(i)}
                        aria-selected={isSelected}
                      >
                        {month}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* Years View */}
            {calendarView === 'years' && (
              <>
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={handlePrevYearRange}
                    aria-label="Previous year range"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <span className={styles.monthYear}>
                    {getYearRange(viewDate.getFullYear())[0]} - {getYearRange(viewDate.getFullYear())[11]}
                  </span>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={handleNextYearRange}
                    aria-label="Next year range"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
                
                <div className={styles.yearsGrid}>
                  {getYearRange(viewDate.getFullYear()).map((year) => {
                    const isSelected = !!value && value.getFullYear() === year;
                    const isCurrent = new Date().getFullYear() === year;
                    
                    const yearClasses = [
                      styles.yearCell,
                      isSelected && styles.yearCellSelected,
                      isCurrent && styles.yearCellCurrent,
                    ].filter(Boolean).join(' ');
                    
                    return (
                      <button
                        key={year}
                        type="button"
                        className={yearClasses}
                        onClick={() => handleYearClick(year)}
                        aria-selected={isSelected}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      {helperText && (
        <div className={styles.underlineWrapper}>
          {hasError && (
            <svg className={styles.underlineIcon} viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 4.5V8.5M8 11V11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          <span className={`${styles.underlineText} ${hasError ? styles.underlineTextError : ''}`}>
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
