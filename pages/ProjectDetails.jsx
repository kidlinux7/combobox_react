import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Folder, ArrowLeft } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectAndForms = async () => {
      try {
        const res = await axios.get(`/api/projects/${projectId}/`);
        setProject(res.data.project);
        setForms(res.data.forms);
      } catch (error) {
        console.error("Failed to fetch project forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndForms();
  }, [projectId]);

  if (loading) return <p className="p-6 text-gray-500">Loading project...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Link to="/" className="text-gray-500 hover:text-black">
            <ArrowLeft size={18} />
          </Link>
          {project?.name}
        </div>
        <span className="text-gray-500">📁 Project Details</span>
      </div>

      {/* Forms List */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Forms in this Project</h2>
        {forms.length === 0 ? (
          <p className="text-sm text-gray-500">No forms created for this project yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {forms.map((form) => (
              <div
                key={form.id}
                className="p-4 border rounded-md shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-2">
                  <Folder className="text-blue-600" size={18} />
                  <span className="font-medium">{form.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Created at: {dayjs(form.created_at).format("MMMM D, YYYY - HH:mm")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
