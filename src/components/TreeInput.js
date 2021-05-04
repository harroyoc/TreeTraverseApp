/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, ErrorMessage } from 'components/lib.js';
import { sanitizeTreeObj } from 'utils/tree';
import { useTree } from 'context/treeContext';
import { ValidationError } from 'utils/errors';

function TreeInput() {
    const { tree, setTree } = useTree();
    const [treeText, setTreeText] = React.useState();
    const [error, setError] = React.useState();

    // Derived state from global state, 
    // we could also keep track of the file hash and use as key on this component
    React.useEffect(() => {
        setTreeText(JSON.stringify(tree, undefined, 2));
        setError(null);
    }, [tree]);

    function convert() {
        try {
            // Parse the text area string, then sanitize the parsed object
            setTree(sanitizeTreeObj(JSON.parse(treeText)));
        } catch (err) {
            if (err instanceof ValidationError) setError(err.message);
            else setError('Please verify your input text is using a correct JSON format');
        }
    }

    return (
        <div css={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '480px',
            width: '100%',
            margin: '20px auto',
            padding: '0 10px',
            boxSizing: 'border-box'
        }}>
            <div css={{ marginBottom: '5px' }}>You can modify the content here, in JSON format</div>
            <textarea
                css={{ height: '300px', marginBottom: '10px' }}
                rows={5}
                cols={120}
                onChange={(e) => {
                    setError(null);
                    setTreeText(e.target.value)
                }}
                value={treeText} />
            <Button onClick={convert}>Process</Button>
            <ErrorMessage error={error} />
        </div>
    );
}

export default TreeInput;