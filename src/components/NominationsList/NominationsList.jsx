import React from 'react';
import { Card, Button, List } from '@shopify/polaris';

const NominationsList = ({ nominations, onRemoval }) => {
    return (
        <Card title="Nominations" sectioned>
            <List type="bullet">

                {nominations.map((item) => {
                    return (
                        <List.Item key={item.id}>
                            {item.title} ({item.year}) <Button onClick={() => onRemoval(item.id)}>Remove</Button>
                        </List.Item>
                    );
                })}

            </List>
        </Card>
    );
};

export { NominationsList }