import React from 'react';
import { Link } from 'react-router-dom';

const JournalList = ({
  journals,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!journals.length) {
    return <h3>No Journal Entries Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {journals &&
        journals.map((journal) => (
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
          </div>
        ))}
    </div>
  );
};

export default JournalList;
