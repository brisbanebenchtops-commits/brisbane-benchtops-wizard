import React from 'react';

export const TextField = ({ label, value, onChange, placeholder, icon, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </label>
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      placeholder={placeholder}
    />
  </div>
);

export const TextArea = ({ label, value, onChange, placeholder, rows = 3, className = '', hint }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {hint && <p className="text-xs text-gray-500 mb-1">{hint}</p>}
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

export const SelectField = ({ label, value, onChange, options, placeholder, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(opt => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const lbl = typeof opt === 'string' ? opt : opt.label;
        return <option key={val} value={val}>{lbl}</option>;
      })}
    </select>
  </div>
);

export const RadioGroup = ({ label, name, value, onChange, options, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={(e) => onChange(e.target.value)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export const CheckboxGroup = ({ label, values, onChange, options, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={(values || []).includes(option)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...(values || []), option]);
              } else {
                onChange((values || []).filter(v => v !== option));
              }
            }}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export const ScriptBlock = ({ children, hint, className = '' }) => (
  <div className={`bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm ${className}`}>
    {hint && (
      <p className="text-xs text-gray-500 mb-2 italic">{hint}</p>
    )}
    <p className="font-medium text-lg leading-relaxed text-gray-800">{children}</p>
  </div>
);

export const CoachingTip = ({ children, type = 'info' }) => {
  const colors = {
    info: 'bg-blue-50 border-blue-300 text-blue-800',
    warning: 'bg-amber-50 border-amber-300 text-amber-800',
    success: 'bg-green-50 border-green-300 text-green-800',
    danger: 'bg-red-50 border-red-300 text-red-800'
  };
  return (
    <div className={`border-l-4 p-3 rounded-r-lg text-sm ${colors[type]}`}>
      {children}
    </div>
  );
};

export const SectionDivider = ({ title }) => (
  <div className="border-t pt-6 mt-6">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
  </div>
);
