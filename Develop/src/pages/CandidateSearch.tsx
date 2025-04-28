import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const users = await searchGithub(); // fetch basic users
        const fullCandidates = await Promise.all(
          users.map((user: any) => searchGithubUser(user.login)) // fetch full profiles
        );
        const validCandidates = fullCandidates.filter(candidate => candidate && candidate.login); // ✅ filter out bad ones
        setCandidates(validCandidates);
      } catch (err) {
        console.error('Failed to fetch candidates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const currentCandidate = candidates[currentIndex];

  const handleAccept = () => {
    if (currentCandidate) {
      const saved = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
      saved.push(currentCandidate);
      localStorage.setItem('potentialCandidates', JSON.stringify(saved));
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleReject = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (!currentCandidate) return <p>No more candidates to review.</p>;

  return (
    <>
      <div>
        <img src={currentCandidate.avatar_url} alt={currentCandidate.name || currentCandidate.login} width={100} />
        <h2>{currentCandidate.name || 'No name provided'}</h2>
        <p><strong>Username:</strong> {currentCandidate.login}</p>
        <p><strong>Location:</strong> {currentCandidate.location || 'N/A'}</p>
        <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
        <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
        <p>
          <strong>GitHub:</strong>{' '}
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </p>

        <button onClick={handleAccept}>+</button>
        <button onClick={handleReject}>−</button>
      </div>
    </>
  );
};

export default CandidateSearch;