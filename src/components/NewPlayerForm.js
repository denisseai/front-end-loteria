import { useState } from 'react';
import'./NewPlayerForm.css';


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
            <label htmlFor="fullName"></label>
            <input
                name="fullName"
                placeholder="Name"
                value={formFields.name}
                onChange={onNameChange} />
            <input
            className="this-button"
            type="submit"
            value="Submit" />
        </form>
    );
};

export default NewPlayerForm;