import { NextUIProvider } from "@nextui-org/react";

import { MainLayout } from "./layouts/MainLayout.tsx";
import { StoreProvider } from "./providers/StoreProvider";

const App = () => (
    <StoreProvider>
        <NextUIProvider>
            <MainLayout/>
        </NextUIProvider>
    </StoreProvider>
);

export default App;