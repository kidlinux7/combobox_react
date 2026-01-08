import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, createProject } from "../redux/projectSlice";
import { Folder, Plus, LogOut } from "lucide-react";
import dayjs from "dayjs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, status } = useSelector((state) => state.project);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    // dispatch(fetchForms());
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    dispatch(createProject({ name: projectName }))
      .unwrap()
      .then(() => {
        setProjectName("");
        dispatch(fetchForms());
      });
  };

  return (
    <div className="p-1">
      {/* Content */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Projects</h2>

          {/* New Project Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={18} />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Button onClick={handleCreateProject}>Create</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Loading State */}
        {status === "loading" && (
          <p className="text-gray-500 mt-2">Loading projects...</p>
        )}

        {/* Project Cards */}
        <div className="grid grid-cols-3 grd-md-cols-3 gap-4 mt-4">
          {Array.isArray(projects) && projects.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
            <div
              key={project.id}
              className="p-5 border rounded-lg hover:shadow-md transition flex flex-col"
            >
              <div className="flex items-center gap-2 text-purple-600">
                <Folder className="text-purple-600" size={"1.5em"} />
                <span className="font-medium text-xl text-zinc-950">{project.name}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Created : {dayjs(project.date_created).format("dddd, MMMM D, YYYY h:mm A")}
              </p>
            </div>
            </Link>

          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
