import { createContext, useContext, useMemo, useState } from 'react';

interface PageProviderProps {
  children: React.ReactNode;
}

interface IPage {
  isPageFirstLoad: boolean;
  activePageContext: () => void;
}

const PageContext = createContext<IPage>({
  isPageFirstLoad: false,
  activePageContext: () => {},
});

export const PageProvider = ({ children }: PageProviderProps) => {
  const [isPageFirstLoad, setIsPageFirstLoad] = useState(false);

  const activePageContext = () => setIsPageFirstLoad(true);

  const memoedValue = useMemo(
    () => ({ isPageFirstLoad, activePageContext }),
    [isPageFirstLoad]
  );

  return (
    <PageContext.Provider value={memoedValue}>{children}</PageContext.Provider>
  );
};

export default function usePage() {
  return useContext(PageContext);
}
