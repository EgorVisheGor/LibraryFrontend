import './App.css';
import {QueryClientProvider} from 'react-query';
import {queryClient} from "./lib/reactQuery.ts";
import {AuthProvider} from "./features/user/AuthProvider.tsx";
import {AppRouter} from "./lib/routes";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppRouter/>
            </AuthProvider>
        </QueryClientProvider>
    )
}
export default App
