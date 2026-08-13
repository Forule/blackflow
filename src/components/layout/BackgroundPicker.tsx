import { useState } from 'react';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { BACKGROUNDS } from '../../theme/backgrounds';

interface BackgroundPickerProps {
  activeId: string;
  onChange: (id: string) => void;
}

export function BackgroundPicker({ activeId, onChange }: BackgroundPickerProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleSelect = (id: string) => {
    onChange(id);
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} aria-label="Hintergrund wählen">
        <WallpaperIcon />
      </IconButton>

      <Menu anchorEl={anchor} open={anchor !== null} onClose={() => setAnchor(null)}>
        {BACKGROUNDS.map((bg) => (
          <MenuItem key={bg.id} selected={bg.id === activeId} onClick={() => handleSelect(bg.id)}>
            <Box
              component="img"
              src={bg.src}
              alt=""
              sx={{ width: 40, height: 28, objectFit: 'cover', borderRadius: 1, mr: 1.5 }}
            />
            {bg.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}