export interface ColorPreset {
  id: string;
  label: string;
  primary: string;
  secondary: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { id: 'magenta', label: 'Magenta', primary: '#FF1E6F', secondary: '#7C3AED' },
  { id: 'cyan', label: 'Cyan', primary: '#06B6D4', secondary: '#3B82F6' },
  { id: 'lime', label: 'Lime', primary: '#84CC16', secondary: '#14B8A6' },
  { id: 'amber', label: 'Amber', primary: '#F59E0B', secondary: '#EF4444' },
];