import { ToggleButtonGroup, ToggleButton, Typography, Divider, Stack } from '@mui/material';
import type { PlanId } from '../../shared/types';

const PLANS = [
  { id: 'monthly' as PlanId, price: '9,90 €', interval: 'MONATLICH', speed: 'bis zu 50 Mbit/s' },
  { id: 'yearly' as PlanId, price: '79,90 €', interval: 'JÄHRLICH', speed: 'bis zu 100 Mbit/s' },
];

interface PlanSelectorProps {
  value: PlanId | null;
  onChange: (plan: PlanId) => void;
}

export function PlanSelector({ value, onChange }: PlanSelectorProps) {
  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={(event, neuerPlan) => {
        if (neuerPlan !== null) {
          onChange(neuerPlan);
        }
      }}
      sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '100%' }}
    >
      {PLANS.map((plan) => (
        <ToggleButton
          key={plan.id}
          value={plan.id}
          sx={{
            p: 2,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            textTransform: 'none',
            '&.Mui-selected': {
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderColor: 'transparent',
              color: '#fff',
            },
          }}
        >
          <Stack sx={{ alignItems: 'flex-start', width: '100%' }}>
            <Typography variant="h2">{plan.price}</Typography>
            <Typography variant="overline">{plan.interval}</Typography>
            <Divider sx={{ my: 1, width: '100%' }} />
            <Typography variant="body2">{plan.speed}</Typography>
          </Stack>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}