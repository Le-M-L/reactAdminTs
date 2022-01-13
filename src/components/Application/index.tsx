import { AppProvider } from './src/AppProvider.tsx';
export const AppProviders = ({ children }:{children:Element}) => {
    return <AppProvider>{children}</AppProvider>;
};
