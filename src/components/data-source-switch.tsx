import { getDataSource, updateDataSource } from "@/utils/fetch";
import { FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * 數據源切換組件
 * @returns 
 */
export default function DataSourceSwitch() {
  const [local, setLocal] = useState(true);
  useEffect(() => {
    setLocal(getDataSource() === 'local')
  }, [])
  const onChange = () => {
    const newLocal = !local;
    setLocal(newLocal);
    updateDataSource(newLocal ? 'local' : 'remote');
  }
  const label = local ? 'Local' : 'Remote'
  return <FormControlLabel sx={{ width: '100px' }}
    control={
      <Switch onChange={onChange} checked={local} />
    } label={label} labelPlacement="start" />
}