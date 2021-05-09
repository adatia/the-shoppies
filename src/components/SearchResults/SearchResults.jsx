import React from 'react';
import { Card, Button, List, TextStyle } from '@shopify/polaris';

const SearchResults = ({ value, results, nomination, nomcount }) => {
    return (
        <Card title={`Results ${value !== '' ? `for ${value}` : ''}`} sectioned>
            <List type="bullet">

                {results.length > 0 ? results.map((item) => {
                    return (
                        <List.Item key={item.id}>
                            {item.title} ({item.year}) <Button disabled={item.nominated || nomcount === 5} onClick={() => nomination(item.id)} >
                                {item.nominated ? "Nominated" : "Nominate"}
                            </Button>
                        </List.Item>
                    );
                }) : <TextStyle>No results found</TextStyle>}
            </List>
        </Card>
    );
};

export { SearchResults }