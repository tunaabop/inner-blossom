import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JournalEditForm from '../JournalEditForm';

const JournalList = ({
  journals,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  const [journalList, setJournalList] = useState(journals);
  const [editingJournalId, setEditingJournalId] = useState(null);

  const handleDelete = (id) => {
    // Perform the deletion logic here
    // You can make an API request to your backend to delete the journal entry with the given ID

    // Update the journalList state by removing the deleted entry
    setJournalList(journalList.filter((journal) => journal._id !== id));
  };

  const handleEdit = (id) => {
    setEditingJournalId(id);
  };

  const handleCancelEdit = () => {
    setEditingJournalId(null);
  };

  const handleSaveEdit = (updatedJournal) => {
    // Perform the update logic here
    // You can make an API request to your backend to update the journal entry

    // Update the journalList state by replacing the old journal entry with the updated one
    setJournalList(
      journalList.map((journal) =>
        journal._id === updatedJournal._id ? updatedJournal : journal
      )
    );

    setEditingJournalId(null);
  };

  if (!journalList.length) {
    return <h3>No Journal Entries Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {journalList.map((journal) => (
        <div key={journal._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link
                className="text-light"
                to={`/profiles/${journal.journalAuthor}`}
              >
                {journal.journalAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this journal on {journal.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  You had this thought on {journal.createdAt}
                </span>
              </>
            )}
          </h4>
          <div className="card-body bg-light p-2">
            <p>{journal.journalText}</p>
          </div>
          <Link
            className="btn btn-primary btn-block btn-squared"
            to={`/journals/${journal._id}`}
          >
            Join the discussion on this thought.
          </Link>
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