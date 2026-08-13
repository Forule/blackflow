import aurora from '@/assets/backgrounds/aurora.png';
import mesh   from '@/assets/backgrounds/mesh.png';
import waves  from '@/assets/backgrounds/waves.png';

export interface Background { 
  id: string; 
  label: string; 
  src: string;
}

export const BACKGROUNDS: Background[] = [
  { id: 'aurora', label: 'Aurora', src: aurora },
  { id: 'mesh',   label: 'Mesh',   src: mesh },
  { id: 'waves',  label: 'Waves',  src: waves },
];