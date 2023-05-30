import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import { ADD_JOURNAL, UPDATE_JOURNAL } from '../../utils/mutations'; // Import the add and update journal mutations
import { QUERY_JOURNALS, QUERY_ME } from '../../utils/queries'; // Import the queries

import Auth from '../../utils/auth';

const JournalForm = ({ journalToEdit, onCancel }) => {
  // State for journal text and character count
  const [journalText, setJournalText] = useState(journalToEdit?.journalText || '');
  const [characterCount, setCharacterCount] = useState(journalToEdit?.journalText.length ?? 0);

  // Mutation hooks for adding and updating journal entries
  const [addJournal] = useMutation(ADD_JOURNAL, {
    update(cache, { data: { addJournal } }) {
      // Update the cache after adding a journal entry
      try {
        const { journals } = cache.readQuery({ query: QUERY_JOURNALS });

        cache.writeQuery({
          query: QUERY_JOURNALS,
          data: { journals: [addJournal, ...journals] },
        });
      } catch (e) {
        console.error(e);
      }

      // Update the cache for the "me" query
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, journals: [...me.journals, addJournal] } },
      });
    },
  });

  const [updateJournal] = useMutation(UPDATE_JOURNAL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (journalToEdit) {
        // Update existing journal entry
        await updateJournal({
          variables: {
            journalId: journalToEdit._id,
            journalText,
          },
        });
      } else {
        // Add new journal entry
        await addJournal({
          variables: {
            journalText,
            journalAuthor: Auth.getProfile().data.username,
          },
        });
      }

      // Clear the form and cancel edit mode
      setJournalText('');
      onCancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;

    if (value.length <= 2800) {
      setJournalText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>{journalToEdit ? 'Edit Journal Entry' : "What's on your mind?"}</h3>

      {Auth.loggedIn() ? (
        <>
          <p className={`m-0 ${characterCount === 2800 ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/2800
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="journalText"
                placeholder="Just start typing..."
                value={journalText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
                tabIndex="0"
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                {journalToEdit ? 'Save Changes' : 'Add a Journal Entry'}
              </button>
              {journalToEdit && (
                <button
                  className="btn btn-secondary btn-block py-3"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add journal entries. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default JournalForm;
