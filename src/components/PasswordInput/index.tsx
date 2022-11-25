import React from 'react'
import { FormControl, InputLabel, OutlinedInput, SxProps } from '@mui/material'

interface Props {
  name: string
  sx: SxProps
  label: string
  value: string
  onChange: React.ChangeEventHandler
}

const PasswordInput: React.FC<Props> = ({ name, sx, label, value, onChange }: Props) => {
  return (
    <FormControl sx={sx} variant="outlined">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        id={name}
        name={name}
        type={'password'}
        value={value}
        onChange={onChange}
        label={label}
      />
    </FormControl>
  )
}

export default PasswordInput
