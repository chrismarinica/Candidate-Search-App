import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const usernames = ['chrismarinica'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCandidate = async (index: number) => {
    setLoading(true);
    const username = usernames[index];
    try {
      const data = await searchGithubUser(username);
      setCandidate(data);
    } catch (err) {
      console.error('Failed to fetch candidate:', err);
      setCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentIndex < usernames.length) {
      fetchCandidate(currentIndex);
    } else {
      setCandidate(null);
    }
  }, [currentIndex]);

  const handleAccept = () => {
    if (candidate) {
      const saved = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
      saved.push(candidate);
      localStorage.setItem('potentialCandidates', JSON.stringify(saved));
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (!candidate) return <p>No more candidates to review.</p>;

  return (
    <div>
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

      <button onClick={handleAccept}>+</button>
      <button onClick={handleReject}>−</button>
    </div>
  );
};

export default CandidateSearch;