import React from 'react';

const HighlightedText = ({ text, search }) => {
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return (
        <>
            {parts.map((part, i) =>
                part.toLowerCase() === search.toLowerCase() ? (
                    <mark key={i}>{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
};

export default HighlightedText;
