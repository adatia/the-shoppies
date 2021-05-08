import React, { useState } from 'react';
import { Card, Form, FormLayout, List, Button, TextField } from '@shopify/polaris';

const CustomMovies = ({ onCreate, library, onDelete, onNominate }) => {
    const [movieTitle, setMovieTitle] = useState('');
    const [movieYear, setMovieYear] = useState('2020');

    return (
        <Card title="Add your own movies" sectioned>
            <Form>
                <FormLayout>
                    <FormLayout.Group>
                        <TextField label="Movie title" value={movieTitle} onChange={(value) => { setMovieTitle(value) }} />
                        <TextField label="Movie year" value={movieYear} type="number" onChange={(value) => { setMovieYear(value) }} />
                    </FormLayout.Group>

                    <Button primary onClick={() => onCreate(movieTitle, movieYear)}>Submit</Button>
                </FormLayout>
            </Form>

            <Card.Section>
                {library.map((item) => {
                    return (
                        <List.Item key={item.id}>
                            {item.title} ({item.year}) <Button disabled={item.nominated} onClick={() => onNominate(item.id)}>Nominate</Button> <Button destructive disabled={item.nominated} onClick={() => onDelete(item.id)} >Delete</Button>
                        </List.Item>
                    );
                })}
            </Card.Section>
        </Card>
    );
};

export { CustomMovies }