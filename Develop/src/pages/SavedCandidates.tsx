import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('potentialCandidates');
    if (stored) {
      setSavedCandidates(JSON.parse(stored));
    }
  }, []);

  if (savedCandidates.length === 0) {
    return <p>No candidates have been accepted yet.</p>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.map((candidate) => (
        <div key={candidate.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
          <img src={candidate.avatar_url} alt={candidate.name || candidate.login} width={100} />
          <h2>{candidate.name || 'No name provided'}</h2>
          <p><strong>Username:</strong> {candidate.login}</p>
          <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
          <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
          <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
          <p>
            <strong>GitHub:</strong>{' '}
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default SavedCandidates;
