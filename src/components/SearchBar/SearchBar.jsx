import React from 'react';
import { FormLayout, TextField, Icon, Card } from '@shopify/polaris';
import { SearchMinor } from '@shopify/polaris-icons';

const SearchBar = ({ value, onChange, onSearch }) => {

    return (
        <Card sectioned>
            <FormLayout>
                <TextField value={value} label="Movie title" prefix={<Icon source={SearchMinor} />}
                    onChange={(value) => { onChange(value) }} />
            </FormLayout>
        </Card>
    );
};

export { SearchBar }