import { Stack, Tooltip, ButtonBase } from '@mui/material';
import { COLOR_PRESETS } from '../../theme/presets';

interface ColorPickerProps {
  activeId: string;
  onChange: (id: string) => void;
}

export function ColorPicker({ activeId, onChange }: ColorPickerProps) {
  return (
    <Stack direction="row" spacing={1} role="radiogroup" aria-label="Farbschema">
      {COLOR_PRESETS.map((preset) => (
        <Tooltip key={preset.id} title={preset.label}>
          <ButtonBase
            role="radio"
            aria-checked={preset.id === activeId}
            aria-label={preset.label}
            onClick={() => onChange(preset.id)}
            sx={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
              outline:
                preset.id === activeId
                  ? '2px solid rgba(255,255,255,0.85)'
                  : '2px solid transparent',
              outlineOffset: 2,
              transition: 'transform 180ms ease',
              '&:hover': { transform: 'scale(1.12)' },
            }}
          />
        </Tooltip>
      ))}
    </Stack>
  );
}