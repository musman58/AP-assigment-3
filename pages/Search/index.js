import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/authcontext/authcontext';
import { useRouter } from 'next/router';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const {user}=useAuth();
const router=useRouter();
  useEffect(() => {
    // Fetch browsing history from the API
    const fetchHistory = async () => {
      try {
        // Replace 'user123' with the actual user ID you want to fetch data for
        const userId = 'user123'; 
        const response = await fetch(`/api/search/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          const filteredHistory = removeEvenEntries(data.book || []);
          setHistory(filteredHistory); // Assuming the API returns `book` as the array of results
        } else {
          setError(data.message || 'Failed to fetch history');
        }
      } catch (err) {
        setError('An error occurred while fetching history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);
  const removeEvenEntries = (entries) => {
    return entries.filter((_, index) => index % 2 !== 0); // Keep only odd-indexed entries
  };
if(!user)
  {

router.push('/login')


  }
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Your Browsing History</h1>
      {history.length > 0 ? (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>{item.url}</Link> {/* Assuming `search` field contains the URL */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No browsing history available.</p>
      )}
    </div>
  );
};

export default HistoryPage;
