import React from 'react';
import { Card, Button, List, TextStyle } from '@shopify/polaris';

const SearchResults = ({ value, results, nomination }) => {
    return (
        <Card title={`Results ${value !== '' ? `for ${value}` : ''}`} sectioned>
            <List type="bullet">

                {results.length > 0 ? results.map((item) => {
                    return (
                        <List.Item key={item.id}>
                            {item.title} ({item.year}) <Button disabled={item.nominated} onClick={() => nomination(item.id)} >Nominate</Button>
                        </List.Item>
                    );
                }) : <TextStyle>No results found</TextStyle>}
            </List>
        </Card>
    );
};

export { SearchResults }