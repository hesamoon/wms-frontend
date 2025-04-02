import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// layout
import Layout from "./layout/Layout";

// router
import Router from "./router/Router";

// conf
import defaultOptions from "./configs/reactQuery.js";

const queryClient = new QueryClient({ defaultOptions: defaultOptions });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
        <Toaster />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
