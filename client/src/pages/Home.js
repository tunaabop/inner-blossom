import React from 'react';
import { useQuery } from '@apollo/client';

import JournalList from '../components/JournalList';
import JournalForm from '../components/JournalForm';

import { QUERY_JOURNALS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_JOURNALS);
  const journals = data?.journals || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <JournalForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <JournalList
            journals={journals}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
