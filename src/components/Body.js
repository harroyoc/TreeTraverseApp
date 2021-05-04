/** @jsxImportSource @emotion/react */
import TreeOutput from 'components/TreeOutput';
import TreeInput from 'components/TreeInput';
import TreeSource from 'components/TreeSource';
import { useTree } from 'context/treeContext';
import * as colors from 'styles/colors'
import { subtreeWithDeepestNodes } from 'utils/tree';

function Body() {
    const { tree } = useTree();
    const deepestNode = subtreeWithDeepestNodes(tree);
    return (
        <div css={{ textAlign: 'center', marginTop: '30px' }}>
            <TreeSource />
            <TreeInput />
            <div css={{
                backgroundColor: colors.gray,
                color: 'black',
                padding: '20px',
                marginTop: '40px'
            }}>
                <div css={{ marginBottom: '10px' }}>Visual Output</div>
                <TreeOutput
                    treeNode={tree}
                    deepestNode={deepestNode} />
            </div>
        </div>
    );
}

export default Body;

