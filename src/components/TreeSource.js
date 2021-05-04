/** @jsxImportSource @emotion/react */
import React from 'react';
import { useTree } from 'context/treeContext';
import { parseIntoTree } from 'utils/tree';
import { ErrorMessage } from 'components/lib';

function TreeSource() {
    const { setTree } = useTree();
    const [error, setError] = React.useState();

    function onFileChange(e) {
        setError(null);
        const currentFile = e.target.files[0];
        if (!currentFile) {
            return;
        }
        let reader = new FileReader();
        reader.readAsText(currentFile);
        reader.onload = function () {
            try {
                setTree(parseIntoTree(JSON.parse(reader.result)));
            } catch (err) {
                setError('Please verify the file content format');
            }
        };
        reader.onerror = function () {
            setError('An error occurred');
        };
    }

    return (
        <div css={{
            marginBottom: '10px',
            justifyContent: 'center',
            padding: '0 10px'
        }}>
            <div css={{ marginBottom: '3px' }}>Select a file to automatically process into a tree</div>
            <div css={{
                marginBottom: '10px',
                fontSize: '12px'
            }}>The file content should be in the format: [id, leftChild, rightChild]</div>
            <input
                css={{
                    border: `1px solid ${error ? 'red' : 'gainsboro'}`,
                    padding: '8px',
                    width: '100%',
                    maxWidth: '460px',
                    boxSizing: 'border-box'
                }}
                type='file'
                onChange={onFileChange} />
            <ErrorMessage error={error} />
        </div>
    );
}

export default TreeSource;
