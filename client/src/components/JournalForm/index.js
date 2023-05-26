import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_JOURNAL } from '../../utils/mutations';
import { QUERY_JOURNALS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const JournalForm = () => {
  const [journalText, setJournalText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addJournal, { error }] = useMutation(ADD_JOURNAL, {
    update(cache, { data: { addJournal } }) {
      try {
        const { journals } = cache.readQuery({ query: QUERY_JOURNALS });

        cache.writeQuery({
          query: QUERY_JOURNALS,
          data: { journals: [addJournal, ...journals] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, journals: [...me.journals, addJournal] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addJournal({
        variables: {
          journalText,
          journalAuthor: Auth.getProfile().data.username,
        },
      });

      setJournalText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'journalText' && value.length <= 2800) {
      setJournalText(value);
      setCharacterCount(value.length);

      console.log('Textarea value:', value); // Debug message
    }
  };

  return (
    <div>
      <h3>What's on your mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 2800 || error ? 'text-danger' : ''
            }`}
          >
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
                Add a Journal entry
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to see journal entries. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default JournalForm;
