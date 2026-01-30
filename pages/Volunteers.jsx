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
    const { centers, status } = useSelector((state) => state.center);

    const [editingVolunteer, setEditingVolunteer] = useState(null);
    const [isCreateVolunteerOpen, setIsCreateVolunteerOpen] = useState(false);
    const [isEditVolunteerOpen, setIsEditVolunteerOpen] = useState(false);
    const [isDeleteVolunteerOpen, setIsDeleteVolunteerOpen] = useState(false);

    const [editingschool, setEditingschool] = useState(null); // Track the school you're editing


    // Volunteer form states
    const [id, setID] = useState(0);
    const [firstName, setFirstname] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
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
        setAge("");
        setNationality("")
        setEducationLevel(0);
        setCourseName("");
        setPhone("");
        setEmail("");
        setGender(0);
        setVolunteeredProjects([]);
        setIsCreateVolunteerOpen(false);
    };

    const handleAddVolunteer = () => {
        if (!firstName.trim() || !lastName || !middleName || !age || !genderChoice) {
            alert("Please fill in all required fields");
            return;
        }
        dispatch(addVolunteer({
            first_name: firstName, middle_name: middleName, last_name: lastName, age: age,
            education_level_id: Number(educationLevel), nationality: volunteerNationality, phone: phone, email: email, gender_id: genderChoice, projects: volunteeredProjects
        }))
            .unwrap()
            .then(() => {
                resetForm();

                setFirstname("");
                setMiddleName("");
                setLastName("");
                setAge("");
                setNationality("");
                setEducationLevel(0);
                setCourseName("");
                setPhone("");
                setEmail("");
                setGender(0);
                setVolunteeredProjects([]);
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
        setNationality(volunteer.volunteerNationality);
        setAge(volunteer.age);
        setEducationLevel(volunteer.education_level?.id.toString() || "");
        setCourseName(volunteer.course_name);
        setPhone(volunteer.phone);
        setEmail(volunteer.email);
        setGender(volunteer.gender?.id.toString() || "");
        setVolunteeredProjects(volunteer.projects || []);
        setIsEditVolunteerOpen(true);
    };

    const handleUpdateVolunteer = () => {
        dispatch(updateVolunteer({
            id: id, first_name: firstName, middle_name: middleName, last_name: lastName, age: age,
            education_level: educationLevel, nationality: volunteerNationality, phone: phone, email: email, gender_id: genderChoice, projects: volunteeredProjects
        }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsEditVolunteerOpen(false);
                setID(0);
                setFirstname("");
                setMiddleName("");
                setLastName("");
                setAge("");
                setNationality("");
                setEducationLevel(0);
                setCourseName("");
                setPhone("");
                setEmail("");
                setGender(0);
                setVolunteeredProjects([]);
                setIsCreateVolunteerOpen(false);
                dispatch(fetchVolunteers());
            });
        setEditingVolunteer(null); // Close the dialog after updating
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


    // Close the dialog after updating
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
                {/* Teachers section */}
                <div className="flex justify-between items-center mt-9">

                    <h2 className="text-lg font-semibold">{(volunteers.length).toString()} {volunteers.length <= 1 ? ('Volunteer') : 'Volunteers'}</h2>
                    <Dialog>
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
                                    <SelectTrigger className="w-full max-w">
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
                                    <SelectTrigger className="w-full max-w">
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
                                <Label htmlFor="education-level">Gender</Label>
                                <Select
                                    value={genderChoice}
                                    onValueChange={(value) => setGender(value)}
                                >
                                    <SelectTrigger className="w-full max-w">
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
                {status === "loading" && <p className="text-gray-500 mt-2">Loading centers...</p>}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            {/* <TableHead>Age Range</TableHead> */}
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
                                    {/* <TableCell>{school.region.name}</TableCell> */}
                                    <TableCell>{volunteer.gender.name}</TableCell>
                                    <TableCell>{volunteer.education_level.name}</TableCell>
                                    <TableCell>{volunteer.phone}</TableCell>
                                    <TableCell>{volunteer.email}</TableCell>
                                    <TableCell>{dayjs(volunteer.created_at).format("dddd, MMMM D, YYYY h:mm A")}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Pencil
                                                        onClick={() => handleEditVolunteer(volunteer)} // Correctly pass a function
                                                        size={17}
                                                        className="cursor-pointer text-black-600"
                                                    />
                                                </DialogTrigger>
                                                {/* Edit Dialog */}
                                                <DialogContent open={isEditVolunteerOpen} onOpenChange={(open) => {
                                                    setIsEditOpen(open);
                                                    if (!open) {
                                                        resetForm(); // Reset form when closing edit dialog
                                                        setEditingVolunteer(null);
                                                    }
                                                }}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Volunteer Information</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="firstname">Firstname</Label>
                                                        <Input
                                                            type="text"
                                                            id="firstname"
                                                            value={firstName}
                                                            onChange={(e) => setFirstname(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="firstname">Middlename</Label>
                                                        <Input
                                                            type="text"
                                                            id="middlename"
                                                            value={middleName}
                                                            onChange={(e) => setMiddleName(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="firstname">Lastname</Label>
                                                        <Input
                                                            type="text"
                                                            id="lastname"
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

                                                    {/* <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="age-range">Age range</Label>
                                                        <Input type="text" id="age-range"
                                                            value={}
                                                            onChange={(e) => setAgeRange(e.target.value)}
                                                        />
                                                    </div> */}


                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="education-level">Educational Level</Label>
                                                        <Select
                                                            value={educationLevel}
                                                            onValueChange={(value) => setEducationLevel(value)}
                                                        >
                                                            <SelectTrigger className="w-full max-w">
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
                                                        <Label htmlFor="education-level">Gender</Label>
                                                        <Select
                                                            value={genderChoice}
                                                            onValueChange={(value) => setGender(value)}
                                                        >
                                                            <SelectTrigger className="w-full max-w">
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


                                                    {/* <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="education-level">School</Label>
                                                        <Select
                                                            value={schoolChoice}
                                                            onValueChange={(value) => setSchoolChoice(value)}
                                                        >
                                                            <SelectTrigger className="w-full max-w">
                                                                <SelectValue placeholder="Select School" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {Array.isArray(centers) && centers.map((type) => (
                                                                        <SelectItem key={type.id} value={type.id.toString()}>
                                                                            {type.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div> */}

                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="projects">Projects</Label>
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

                                            <Dialog>
                                                <DialogTrigger>
                                                    <Trash2
                                                        onClick={() => handleDeleteClick(volunteer)} // Correctly pass a function
                                                        size={17}
                                                        className="cursor-pointer text-black-600"
                                                    />
                                                </DialogTrigger>

                                                {/* Delete Dialog */}
                                                <DialogContent onClose={() => setIsDeleteVolunteerOpen(null)}>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete school Information</DialogTitle>
                                                        <h3>This action will permanently erase <b>{firstName + ' ' + middleName + ' ' + lastName}</b> from the database</h3>
                                                    </DialogHeader>
                                                    <Button variant="destructive" onClick={handleDeleteVolunteer}>Delete</Button>
                                                </DialogContent>
                                            </Dialog>




                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>









            </div>
        </div>
    );
}
export default Volunteers