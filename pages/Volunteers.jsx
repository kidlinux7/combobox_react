import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2, Pencil, Eye, ArrowRight, ArrowLeftIcon } from "lucide-react";
import dayjs from "dayjs";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { addVolunteer, updateVolunteer, deleteVolunteer, fetchVolunteers } from "../redux/volunteerSlice";
import { fetchGenders } from "../redux/genderSlice";
import { fetchEducationLevel } from "../redux/educationLevelSlice";
import { fetchProjects } from "../redux/projectSlice";
import { fetchNationalities } from "../redux/nationalitySlice";


const Volunteers = () => {
    const dispatch = useDispatch();
    const { volunteers } = useSelector((state) => state.volunteer);
    const { projects } = useSelector((state) => state.project);
    const { genders } = useSelector((state) => state.gender);
    const { nationalities } = useSelector((state) => state.nationality);
    const { educationLevels } = useSelector((state) => state.educationLevel);
    const { status } = useSelector((state) => state.center);

    const [editingVolunteer, setEditingVolunteer] = useState(null);
    const [isCreateVolunteerOpen, setIsCreateVolunteerOpen] = useState(false);
    const [isEditVolunteerOpen, setIsEditVolunteerOpen] = useState(false);
    const [isDeleteVolunteerOpen, setIsDeleteVolunteerOpen] = useState(false);

    // Volunteer form states
    const [id, setID] = useState(0);
    const [firstName, setFirstname] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [disability, setDisability] = useState(false);
    const [age, setAge] = useState(0);
    const [volunteerNationality, setNationality] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [courseName, setCourseName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [genderChoice, setGender] = useState("");
    const [volunteeredProjects, setVolunteeredProjects] = useState([]);

    useEffect(() => {
        dispatch(fetchProjects());
        dispatch(fetchVolunteers());
        dispatch(fetchGenders());
        dispatch(fetchEducationLevel());
        dispatch(fetchNationalities());
    }, [dispatch]);


    const resetForm = () => {
        setID(0);
        setFirstname("");
        setMiddleName("");
        setLastName("");
        setDisability(false);
        setAge("");
        setNationality("")
        setEducationLevel(0);
        setCourseName("");
        setPhone("");
        setEmail("");
        setGender(0);
        setVolunteeredProjects([]);
    };

    const handleAddVolunteer = () => {
        if (!firstName.trim() || !lastName || !middleName || !age || !genderChoice) {
            alert("Please fill in all required fields");
            return;
        }
        dispatch(addVolunteer({
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            age: age,
            disability: disability,
            education_level_id: Number(educationLevel),
            nationality: Number(volunteerNationality),
            phone: phone,
            email: email,
            gender_id: Number(genderChoice),
            projects: volunteeredProjects
        }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsCreateVolunteerOpen(false);
                dispatch(fetchVolunteers());
            });
    };

    const handleEditVolunteer = (volunteer) => {
        setEditingVolunteer(volunteer);
        setID(volunteer.id);
        setFirstname(volunteer.first_name);
        setMiddleName(volunteer.middle_name);
        setLastName(volunteer.last_name);
        setDisability(volunteer.disability);
        setNationality(volunteer.nationality?.id?.toString() || volunteer.nationality?.toString() || "");
        setAge(volunteer.age);
        setEducationLevel(volunteer.education_level?.id?.toString() || volunteer.education_level?.toString() || "");
        setCourseName(volunteer.course_name);
        setPhone(volunteer.phone);
        setEmail(volunteer.email);
        setGender(volunteer.gender?.id?.toString() || volunteer.gender?.toString() || "");
        setVolunteeredProjects(volunteer.projects?.map(p => (p.id ? p.id.toString() : p.toString())) || []);
        setIsEditVolunteerOpen(true);
    };

    const handleUpdateVolunteer = () => {
        dispatch(updateVolunteer({
            id: id,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            age: age,
            disability: disability,
            course_name: courseName,
            education_level_id: Number(educationLevel),
            nationality: Number(volunteerNationality),
            phone: phone,
            email: email,
            gender_id: Number(genderChoice),
            projects: volunteeredProjects
        }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsEditVolunteerOpen(false);
                dispatch(fetchVolunteers());
            });
    };

    const handleDeleteVolunteer = () => {
        dispatch(deleteVolunteer({ id: id }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsDeleteVolunteerOpen(false);
                setEditingVolunteer(null);
                dispatch(fetchVolunteers());
            });
    };


    const handleDeleteClick = (volunteer) => {
        setEditingVolunteer(volunteer);
        setID(volunteer.id);
        setFirstname(volunteer.first_name);
        setMiddleName(volunteer.middle_name);
        setLastName(volunteer.last_name);
        setIsDeleteVolunteerOpen(true);
    };

    return (
        <div className="p-1">
            <div className="mt-6">
                <div className="flex justify-between items-center mt-9">
                    <h2 className="text-lg font-semibold">{volunteers.length} {volunteers.length <= 1 ? 'Volunteer' : 'Volunteers'}</h2>
                    <Dialog
                        open={isCreateVolunteerOpen}
                        onOpenChange={(open) => {
                            setIsCreateVolunteerOpen(open);
                            if (open) {
                                resetForm();
                            }
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus size={18} />
                                Add Volunteer
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Volunteer</DialogTitle>
                            </DialogHeader>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="firstname">Firstname</Label>
                                <Input type="text" id="firstname"
                                    value={firstName}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="middlename">Middlename</Label>
                                <Input type="text" id="middlename"
                                    value={middleName}
                                    onChange={(e) => setMiddleName(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input type="text" id="lastname"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Label htmlFor="disability" className="text-sm font-medium">
                                    Disability (Physical or Psychological)
                                </Label>
                                <Input
                                    type="checkbox"
                                    id="disability"
                                    checked={disability}
                                    onChange={(e) => setDisability(e.target.checked)}
                                    className="h-4 w-4"
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="age">Age</Label>
                                <Input type="number" id="age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="nationality">Nationality</Label>
                                <Select
                                    value={volunteerNationality}
                                    onValueChange={(value) => setNationality(value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Nationality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.isArray(nationalities) && nationalities.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="education-level">Educational Level</Label>
                                <Select
                                    value={educationLevel}
                                    onValueChange={(value) => setEducationLevel(value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Education Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.isArray(educationLevels) && educationLevels.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="course">Course name / Skill</Label>
                                <Input type="text" id="course"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="text" id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={genderChoice}
                                    onValueChange={(value) => setGender(value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.isArray(genders) && genders.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="projects">Projects</Label>
                                <MultiSelect
                                    options={Array.isArray(projects) ? projects.map(p => ({ label: p.name, value: p.id.toString() })) : []}
                                    value={volunteeredProjects}
                                    onValueChange={(value) => setVolunteeredProjects(value)}
                                    placeholder="Select Projects"
                                />
                            </div>

                            <Button onClick={handleAddVolunteer}>Create</Button>
                        </DialogContent>
                    </Dialog>
                </div>

                {status === "loading" && <p className="text-gray-500 mt-2">Loading...</p>}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Education Level</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(volunteers) &&
                            volunteers.map((volunteer, index) => (
                                <TableRow key={volunteer.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{volunteer.first_name + ' ' + volunteer.last_name}</TableCell>
                                    <TableCell>{volunteer.age}</TableCell>
                                    <TableCell>{volunteer.gender?.name}</TableCell>
                                    <TableCell>{volunteer.education_level?.name}</TableCell>
                                    <TableCell>{volunteer.phone}</TableCell>
                                    <TableCell>{volunteer.email}</TableCell>
                                    <TableCell>{dayjs(volunteer.created_at).format("dddd, MMMM D, YYYY h:mm A")}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Pencil
                                                onClick={() => handleEditVolunteer(volunteer)}
                                                size={17}
                                                className="cursor-pointer text-black-600"
                                            />
                                            <Trash2
                                                onClick={() => handleDeleteClick(volunteer)}
                                                size={17}
                                                className="cursor-pointer text-black-600"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                {/* Edit Dialog */}
                <Dialog open={isEditVolunteerOpen} onOpenChange={setIsEditVolunteerOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Volunteer Information</DialogTitle>
                        </DialogHeader>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-firstname">Firstname</Label>
                            <Input
                                type="text"
                                id="edit-firstname"
                                value={firstName}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-middlename">Middlename</Label>
                            <Input
                                type="text"
                                id="edit-middlename"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-lastname">Lastname</Label>
                            <Input
                                type="text"
                                id="edit-lastname"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Label htmlFor="edit-disability" className="text-sm font-medium">
                                Disability (Physical or Psychological)
                            </Label>
                            <Input
                                type="checkbox"
                                id="edit-disability"
                                checked={disability}
                                onChange={(e) => setDisability(e.target.checked)}
                                className="h-4 w-4"
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-age">Age</Label>
                            <Input type="number" id="edit-age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-nationality">Nationality</Label>
                            <Select
                                value={volunteerNationality}
                                onValueChange={(value) => setNationality(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Nationality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.isArray(nationalities) && nationalities.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-education-level">Educational Level</Label>
                            <Select
                                value={educationLevel}
                                onValueChange={(value) => setEducationLevel(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Education Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.isArray(educationLevels) && educationLevels.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-course">Course name / Skill</Label>
                            <Input type="text" id="edit-course"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-phone">Phone</Label>
                            <Input type="text" id="edit-phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input type="text" id="edit-email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-gender">Gender</Label>
                            <Select
                                value={genderChoice}
                                onValueChange={(value) => setGender(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.isArray(genders) && genders.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-projects">Projects</Label>
                            <MultiSelect
                                options={Array.isArray(projects) ? projects.map(p => ({ label: p.name, value: p.id.toString() })) : []}
                                value={volunteeredProjects}
                                onValueChange={(value) => setVolunteeredProjects(value)}
                                placeholder="Select Projects"
                            />
                        </div>

                        <Button onClick={handleUpdateVolunteer}>Update</Button>
                    </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog open={isDeleteVolunteerOpen} onOpenChange={setIsDeleteVolunteerOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Volunteer Information</DialogTitle>
                            <h3>This action will permanently erase <b>{firstName + ' ' + middleName + ' ' + lastName}</b> from the database</h3>
                        </DialogHeader>
                        <Button variant="destructive" onClick={handleDeleteVolunteer}>Delete</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Volunteers;