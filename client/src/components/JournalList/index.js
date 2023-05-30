import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import JournalEditForm from '../JournalEditForm';
import { REMOVE_JOURNAL, UPDATE_JOURNAL } from '../../utils/mutations';

const JournalList = ({
  journals,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [journalList, setJournalList] = useState(journals);
  const [editingJournalId, setEditingJournalId] = useState(null);
  const [deleteJournal] = useMutation(REMOVE_JOURNAL);
  const [updateJournal] = useMutation(UPDATE_JOURNAL);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteJournal({
        variables: { journalId: id },
      });

      // Update the journalList state by removing the deleted entry
      setJournalList(journalList.filter((journal) => journal._id !== id));
    } catch (error) {
      console.error('Failed to delete journal entry', error);
    }
  };

  const handleEdit = (id) => {
    setEditingJournalId(id);
  };

  const handleCancelEdit = () => {
    setEditingJournalId(null);
  };

  const handleSaveEdit = async (updatedJournal) => {
    try {
      const { data } = await updateJournal({
        variables: {
          id: updatedJournal._id,
          journalText: updatedJournal.journalText,
        },
      });

      setJournalList(
        journalList.map((journal) =>
          journal._id === data.updateJournal._id ? data.updateJournal : journal
        )
      );

      setEditingJournalId(null);

      // Set the state to show the success message
      setShowSuccessMessage(true);

      setTimeout(() => {
        // Reset the state to hide the success message after 3 seconds
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update journal entry', error);
    }
  };

  if (!journalList.length) {
    return <h3>No Journal Entries Yet</h3>;
  }

  return (
    <div>
      {showSuccessMessage && (
        <div className="success-message">Journal entry updated successfully!</div>
      )}
      {showTitle && <h3>{title}</h3>}
      {journalList.map((journal) => (
        <div key={journal._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link
                className="text-light"
                to={`/profiles/${journal.journalAuthor}`}
              >
                <span style={{ fontSize: '1rem' }}>
                  Entry created on {journal.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  Entry created on {journal.createdAt}
                </span>
              </>
            )}
          </h4>
          <div className="card-body bg-light p-2">
            <p>{journal.journalText}</p>
          </div>
          <button
            className="btn btn-danger btn-block btn-squared"
            onClick={() => handleDelete(journal._id)}
          >
            Delete
          </button>
          {editingJournalId === journal._id ? (
            <JournalEditForm
              journal={journal}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
            />
          ) : (
            <button
              className="btn btn-secondary btn-block btn-squared"
              onClick={() => handleEdit(journal._id)}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalList;
