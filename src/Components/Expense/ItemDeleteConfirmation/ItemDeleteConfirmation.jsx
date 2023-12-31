import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function ItemDeleteConfirmation(props) {
    const {
        setDeleteConfirmation,
        handleCancel,
        setAreExpensesFetched,
        setItems,
        setCompleteItem,
        items,
    } = props;

    // STATES
    const [cookies, setCookie] = useCookies('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Promise.all(
                items.map(async (itemId) => {
                    await axios.delete(
                        `${process.env.REACT_APP_API_URI}/expenses/${itemId}`,
                        {
                            method: 'DELETE',
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${cookies.token}`,
                            },
                        }
                    );
                    setAreExpensesFetched(false);
                })
            );
        } catch (error) {
            throw new Error('Erreur lors de la suppression de dépenses')
        }
        setAreExpensesFetched(false);
        setDeleteConfirmation(false);
        setItems([]);
        setCompleteItem([]);
    };
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className='form delete-form'
            >
                <div className='form__buttons'>
                    <div
                        className='btn-cancel btn'
                        onClick={handleCancel}
                    >
                        Annuler
                    </div>
                    <button className='btn-delete btn' type='submit'>
                        Confirmer la suppression
                    </button>
                </div>
            </form>
        </>
    );
}
