/** @jsxImportSource @emotion/styled */
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'

const Button = styled.button(
    {
        minWidth: '100px',
        height: '40px',
        borderRadius: '4px',
        margin: 0,
        padding: 0,
        fontWeight: 600,
        display: 'inline-block',
        border: 'none',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase'
    },
    ({ disabled }) => ({
        cursor: disabled ? 'not-allowed' : 'pointer',
        backgroundColor: disabled ? colors.gray : colors.orange,
        ':hover': {
            backgroundColor: disabled ? colors.gray : colors.orange10,
        }
    })
);

const Header = styled.header({
    backgroundColor: colors.darkBlue,
    fontSize: '21px',
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: '20px',
    fontWeight: 600,
    color: 'white'
});

function ErrorMessage({ error }) {
    const Div = styled.div({
        color: "red",
        fontSize: "14px",
        marginTop: '10px'
    });

    const Span = styled.span({
        fontWeight: 600
    });
    return (
        error ?
            <Div><Span>ERROR:</Span> {error}</Div> :
            null
    );
}

export {
    Button,
    Header,
    ErrorMessage
};