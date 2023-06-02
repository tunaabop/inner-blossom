import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { QUERY_JOURNALS } from '../../utils/queries';
const UPDATE_JOURNAL = gql`
  mutation UpdateJournal($journalId: ID!, $journalText: String!) {
    updateJournal(journalId: $journalId, journalText: $journalText) {
      _id
      journalText
    }
  }
`;

// const QUERY_JOURNALS = gql`
//   query GetJournals {
//     journals {
//       _id
//       journalText
//     }
//   }
// `;

const JournalEditForm = ({ journal, onCancel }) => {
  const [journalText, setJournalText] = useState(journal.journalText);

  const [updateJournal] = useMutation(UPDATE_JOURNAL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateJournal({
        variables: {
          journalId: journal._id,
          journalText,
        },
        update: (cache, { data }) => {
          try {
            console.log("cache: ", cache);
            console.log("cache read query",cache.readQuery({ query: QUERY_JOURNALS }));
            const { journals } = cache.readQuery({ query: QUERY_JOURNALS });
            const updatedJournal = data.updateJournal;
            const updatedJournals = journals.map((j) =>
              j._id === updatedJournal._id ? updatedJournal : j
            );
            cache.writeQuery({
              query: QUERY_JOURNALS,
              data: { journals: updatedJournals },
            });
          } catch (error) {
            // Handle case when cache.readQuery returns null
            console.error('Failed to read or update journal cache', error);
          }
        },
      });

      onCancel();
    } catch (error) {
      console.error('Failed to update journal entry', error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setJournalText(value);
  };

  return (
    <div>
      <h3>Edit Journal Entry</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <textarea
            name="journalText"
            value={journalText}
            onChange={handleChange}
            className="form-control"
            rows="5"
            placeholder="Enter your journal text"
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Save Changes
        </button>
        <button className="btn btn-secondary ml-2" type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default JournalEditForm;
