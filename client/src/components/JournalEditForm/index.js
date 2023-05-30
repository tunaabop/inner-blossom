import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { UPDATE_JOURNAL } from '../../utils/mutations';
import { QUERY_JOURNALS } from '../../utils/queries';

const JournalEditForm = ({ journal, onCancel }) => {
  // State for the edited journal text
  const [journalText, setJournalText] = useState(journal.journalText);

  // Mutation hook for updating the journal entry
  const [updateJournal] = useMutation(UPDATE_JOURNAL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateJournal({
        variables: {
          journalId: journal._id,
          journalText,
        },
        refetchQueries: [{ query: QUERY_JOURNALS }],
      });

      onCancel();
    } catch (err) {
      console.error(err);
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
