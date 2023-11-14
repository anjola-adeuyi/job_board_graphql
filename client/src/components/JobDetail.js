import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getJob } from '../graphql/queries';

function JobDetail() {
  const { jobId } = useParams();

  const [job, setJob] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJob(jobId)
      .then((job) => setJob(job))
      .catch((err) => setError(true));
  }, [jobId]);

  if (!job) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Sorry, something went wrong.</>;
  }

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
}

export default JobDetail;
