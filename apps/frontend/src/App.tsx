import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import DashBoard from "./screens/DashBoard";

const URL = process.env.GRAPHQL_HOST
    ? `https://${process.env.GRAPHQL_HOST}/graphql`
    : "http://localhost:8000/graphql";

const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <DashBoard />
        </ApolloProvider>
    );
}

export default App;
