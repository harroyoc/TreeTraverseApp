/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react'
import * as colors from 'styles/colors'

const showNode = keyframes`
    from {
        opacity: 0;
        transform: scale(0);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

function TreeOutput({ treeNode, deepestNode }) {
    if (!treeNode) {
        return null;
    }
    const isDeepest = treeNode === deepestNode;

    return (
        <div css={{
            border: `${isDeepest ? '2px' : '1px'} solid ${isDeepest ? colors.green : colors.blue}`,
            padding: '8px',
            margin: '5px',
            display: 'inline-block',
            animation: `${showNode} 0.5s ease-in-out`,
        }}>
            <div css={{ fontWeight: 600, textAlign: 'center' }}>{treeNode.id}</div>
            {treeNode.left || treeNode.right ?
                <div css={{
                    display: 'flex',
                    border: `1px solid ${colors.darkBlue}`,
                    marginTop: '5px',
                    padding: '5px',
                    flexWrap: 'wrap'
                }}>
                    <TreeOutput treeNode={treeNode.left} deepestNode={deepestNode} />
                    <TreeOutput treeNode={treeNode.right} deepestNode={deepestNode} />
                </div> :
                null
            }
        </div>
    );
}

export default TreeOutput;


