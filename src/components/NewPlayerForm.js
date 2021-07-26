import { useState } from 'react';


const NewPlayerForm = (props) => {

    const [formFields, setFormFields] = useState({
        name: ''
    });

    const onNameChange = (event) => {
        setFormFields({
            ...formFields,
            name: event.target.value
        })
    };
    const onFormSubmit = (event) => {
        event.preventDefault();

        props.onSubmitForm({
            name: formFields.name
        });
        setFormFields({
            name: '',
        });
    };

    return (
        <form onSubmit={onFormSubmit} >
            <label htmlFor="fullName">Name:</label>
            <input
                name="fullName"
                value={formFields.name}
                onChange={onNameChange} />
            <input
            type="submit"
            value="Submit" />
        </form>
    );
};

export default NewPlayerForm;