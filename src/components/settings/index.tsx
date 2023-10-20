"use client"

import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateIsR18PlusCheckedInMenu } from '@/components/menu/menu';

interface SettingComponentsProps {
  settingLabel: string;
  settingDescription: string;
  id: string;
  className?: string | undefined;
  updateIsR18PlusCheckedInMenu?: (newState: string) => void | undefined;
}

const SettingComponents: React.FC<SettingComponentsProps> = ({ className, settingLabel, settingDescription, id }) => {
  const [dataState, setDataState] = useState<boolean>(false);

  const handleButtonClick = () => {
    const newDataState = !dataState;
    setDataState(newDataState);

    // Call the function from menu.js to update its state
    updateIsR18PlusCheckedInMenu(newDataState ? 'checked' : 'unchecked');

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(id, newDataState ? 'checked' : 'unchecked');
    }
  };

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storedDataState = localStorage.getItem(id);
      if (storedDataState) {
        setDataState(storedDataState === 'checked');
      }
    }
  }, []);

  return (
    <section className={className}>
      <div className="flex flex-row items-center justify-between rounded-lg">
        <div>
          <Label htmlFor={id}>{settingLabel}</Label>
          <p className="text-[0.8rem] text-[#a1a1aa]">{settingDescription}</p>
        </div>
        <div>
          <Switch id={id} checked={dataState} onClick={handleButtonClick} />
        </div>
      </div>
    </section>
  );
};

export default SettingComponents;
