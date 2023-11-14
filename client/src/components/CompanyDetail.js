import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../graphql/queries';
import JobList from './JobList';

function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getCompany(companyId)
      .then((company) => setCompany(company))
      .catch((err) => setError(true));
  }, [companyId]);

  if (!company) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Sorry, something went wrong.</>;
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
