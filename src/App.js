import { TreeProvider } from './context/treeContext';
import Body from 'components/Body';
import { Header } from 'components/lib';

function App() {
    return (
        <TreeProvider>
            <Header>Tree Traverse App</Header>
            <Body />
        </TreeProvider>
    )
}

export default App;