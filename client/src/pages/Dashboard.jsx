import { useEffect, useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusStyles = {
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-yellow-100 text-yellow-700",
  Offer: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs on load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">ApplyFlow</h1>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">My Job Applications</h2>
          {/* Next step: Add Job button */}
          <button
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => alert("Next step: Add Job form")}
          >
            + Add Job
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-gray-600">Loading jobs...</p>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white rounded-lg p-6 text-center text-gray-600">
            No jobs yet. Click <strong>“Add Job”</strong> to get started.
          </div>
        )}

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{job.company}</h3>
                <p className="text-sm text-gray-600">{job.role}</p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${statusStyles[job.status]}`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
