import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;`
;
    
const Search = styled.input`    
    width: 200px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button.attrs({
    className: 'btn btn-primary'
})`
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #ff0000;
    color: white;
    margin-left: 10px;
    cursor: pointer;

    &:hover{
        background-color: #555;
    }
`;

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <Form onSubmit={handleSearch}>
            <Search
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games..."
            />
            <Button type="submit">Search</Button>
        </Form>
    );
};

export default SearchBar;
