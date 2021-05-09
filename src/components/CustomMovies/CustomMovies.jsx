import React, { useState } from 'react';
import { Card, FormLayout, List, Button, TextField } from '@shopify/polaris';

const CustomMovies = ({ onCreate, library, onDelete, onNominate, nomcount }) => {
    const [movieTitle, setMovieTitle] = useState('');
    const [movieYear, setMovieYear] = useState('2020');

    return (
        <Card title="Add your own movies" sectioned>
                <FormLayout>
                    <FormLayout.Group>
                        <TextField label="Movie title" value={movieTitle} onChange={(value) => { setMovieTitle(value) }} />
                        <TextField label="Movie year" value={movieYear} type="number" onChange={(value) => { setMovieYear(value) }} />
                    </FormLayout.Group>

                    <Button primary disabled={movieTitle === ''} onClick={() => onCreate(movieTitle, movieYear)}>Submit</Button>
                </FormLayout>

            <Card.Section>
                {library.map((item) => {
                    return (
                        <List.Item key={item.id}>
                            {item.title} ({item.year}) <Button disabled={item.nominated || nomcount === 5} onClick={() => onNominate(item.id)}> {item.nominated ? "Nominated" : "Nominate"}</Button> <Button destructive disabled={item.nominated} onClick={() => onDelete(item.id)} >Delete</Button>
                        </List.Item>
                    );
                })}
            </Card.Section>
        </Card>
    );
};

export { CustomMovies }