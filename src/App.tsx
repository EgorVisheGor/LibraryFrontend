import './App.css';
import {QueryClientProvider} from 'react-query';
import {queryClient} from "./lib/reactQuery.ts";
import {AuthProvider} from "./features/user/AuthProvider.tsx";
import {AppRouter} from "./lib/routes";
import.meta.env.BASE_URL='http://localhost:5185/';

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
