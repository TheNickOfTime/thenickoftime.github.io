import React, { createContext } from 'react';

export interface ToolbarContextType {
	focusedDropdown: string | null;
	setFocusedDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ToolbarContext = createContext<ToolbarContextType | null>(null);
