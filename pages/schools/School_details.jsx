import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Trash2, Pencil, Eye, ArrowRight, ArrowLeftIcon } from "lucide-react";
import dayjs from "dayjs";

import { addSchool, deleteSchool, fetchSchools, updateSchool } from "../../redux/schoolSlice";

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
import { addStudent, updateStudent, deleteStudent, fetchStudents } from "../../redux/studentSlice";
import { fetchGenders } from "../../redux/genderSlice";
import { fetchEducationLevel } from "../../redux/educationLevelSlice";
import { fetchTeachers } from "../../redux/teacherSlice";
import { fetchUniversities } from "../../redux/universitySlice";



const SchoolDetails = () => {
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.student);
    const { genders } = useSelector((state) => state.gender);
    const { teachers } = useSelector((state) => state.teacher);
    const { universities } = useSelector((state) => state.university);
    const { educationLevels } = useSelector((state) => state.educationLevel);
    const { schools, status } = useSelector((state) => state.school);

    const [editingStudent, setEditingStudent] = useState(null);
    const [isCreateStudentOpen, setIsCreateStudentOpen] = useState(false);
    const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
    const [isDeleteStudentOpen, setIsDeleteStudentOpen] = useState(false);

    const [editingTeacher, setEditingTeacher] = useState(null);
    const [isCreateTeacherOpen, setIsCreateTeacherOpen] = useState(false);
    const [isEditTeacherOpen, setIsEditTeacherOpen] = useState(false);
    const [isDeleteTeacherOpen, setIsDeleteTeacherOpen] = useState(false);

    const { schoolName } = useParams();
    const location = useLocation();
    const school = location.state?.school;
    const [editingschool, setEditingschool] = useState(null); // Track the school you're editing


    // Student/Teachers form states
    const [id, setID] = useState(0);
    const [firstName, setFirstname] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [disability, setDisability] = useState(false);

    const [age, setAge] = useState(0);
    const [ageRange, setAgeRange] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [courseName, setCourseName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [genderChoice, setGender] = useState("");
    const [schoolChoice, setSchoolChoice] = useState("");
    const [universityChoice, setUniversityChoice] = useState("");
    const [centerChoice, setCenterChoice] = useState("");

    const handleAddStudentSchool = (school) => {
        if (school?.id) {
            setSchoolChoice(school.id.toString());
        }
    }


    useEffect(() => {
        dispatch(fetchSchools());
        dispatch(fetchStudents(schoolName));
        dispatch(fetchGenders());
        dispatch(fetchEducationLevel());
        dispatch(fetchTeachers());
        dispatch(fetchUniversities());
    }, [dispatch]);


    const resetForm = () => {
        setID(0);
        setFirstname("");
        setMiddleName("");
        setLastName("");
        setDisability(false);
        setAge("");
        setAgeRange("");
        setEducationLevel("");
        setCourseName("");
        setPhone("");
        setEmail("");
        setGender("");
        setSchoolChoice("");
        setUniversityChoice("");
        setCenterChoice("");
        setIsCreateStudentOpen(false);
    };



    const handleAddStudent = () => {
        if (!firstName.trim() || !lastName || !middleName || !age || !genderChoice) {
            alert("Please fill in all required fields");
            return;
        }

        // Prefill schoolChoice with the current school ID



        dispatch(addStudent({
            first_name: firstName, middle_name: middleName, last_name: lastName, disability: disability, age: age, age_range: ageRange,
            education_level_id: Number(educationLevel), course_name: courseName, phone: phone, email: email, gender_id: genderChoice, school_id: schoolChoice, university_id: universityChoice, center_id: centerChoice
        }))
            .unwrap()
            .then(() => {
                resetForm();
                dispatch(fetchStudents(schoolName));
            });

    };

    const handleEditStudent = (student) => {
        setEditingStudent(student);
        setID(student.id);
        setFirstname(student.first_name);
        setMiddleName(student.middle_name);
        setLastName(student.last_name);
        setDisability(student.disability);
        setAge(student.age);
        setAgeRange(student.age_range);
        setEducationLevel(student.education_level?.id.toString() || "");
        setCourseName(student.course_name);
        setPhone(student.phone);
        setEmail(student.email);
        setGender(student.gender?.id.toString() || "");
        setSchoolChoice(student.school?.id.toString() || "");
        setUniversityChoice(student.university?.id.toString() || "");
        setCenterChoice(student.center?.id.toString() || "");

        setIsEditStudentOpen(true);
    };

    const handleUpdateStudent = () => {
        dispatch(updateStudent({
            id: id, first_name: firstName, middle_name: middleName, last_name: lastName, disability: disability, age: age, age_range: ageRange,
            education_level: educationLevel, course_name: courseName, phone: phone, email: email, gender_id: genderChoice, school_id: schoolChoice, university_id: universityChoice, center_id: centerChoice
        }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsEditStudentOpen(false);
                dispatch(fetchStudents(schoolName));
            });
        setEditingStudent(null); // Close the dialog after updating
    };

    const handleDeleteStudent = () => {
        dispatch(deleteStudent({ id: id }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsDeleteStudentOpen(false);
                setEditingStudent(null);
                // setID(0);
                // setFirstname("");
                // setMiddleName("");
                // setLastName("");
                // setAge("");
                // setAgeRange("");
                // setEducationLevel(0);
                // setCourseName("");
                // setPhone("");
                // setEmail("");
                // setGender(0);
                // setSchoolChoice(0);
                // setUniversityChoice(0);
                dispatch(fetchStudents(schoolName));
            });
    };


    // Close the dialog after updating
    const handleDeleteClick = (student) => {
        setEditingStudent(student);
        setID(student.id);
        setFirstname(student.first_name);
        setMiddleName(student.middle_name);
        setLastName(student.last_name);
        setIsDeleteStudentOpen(true);
    };
    return (
        <div className="p-1">
            <div className="mt-6">
                <div className="flex justify-between items-center">

                    <Link
                        to={`/schools`}
                    >
                        <div className="flex items-center gap-2 cursor-pointer">
                            <ArrowLeftIcon />
                            <h2 className="text-xl font-semibold">{schoolName}</h2>
                        </div>
                    </Link>

                    {/* Create school */}
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-4 mb-8 text-sm border-b pb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Type:</span>
                        <span className="font-semibold">{school.type.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Region:</span>
                        <span className="font-semibold">{school.region.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Computers:</span>
                        <span className="font-semibold">{school.computers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Libraries:</span>
                        <span className="font-semibold">{school.libraries}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Water Reserves:</span>
                        <span className="font-semibold">{school.water_reserves}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Toilets:</span>
                        <span className="font-semibold">{school.toilets}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Focal Person:</span>
                        <span className="font-semibold">{school.focal_person_fullname}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Focal Phone:</span>
                        <span className="font-semibold">{school.focal_person_phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-medium">Focal Email:</span>
                        <span className="font-semibold">{school.focal_person_email}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 md:pt-0">
                        <span className="text-gray-400 text-xs italic">
                            Created: {dayjs(school.created_at).format("MMMM D, YYYY")}
                        </span>
                    </div>
                </div>

                {/* Teachers section */}
                <div className="flex justify-between items-center mt-9">

                    <h2 className="text-lg font-semibold">{(students.length).toString()} {students.length <= 1 ? ('Student') : 'Students'}</h2>
                    <Dialog open={isCreateStudentOpen} onOpenChange={(open) => {
                        setIsCreateStudentOpen(open);
                        if (open && school) {
                            handleAddStudentSchool(school);
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus size={18} />
                                Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Student</DialogTitle>
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
                                <Label htmlFor="age-range">Age range</Label>
                                <Input type="text" id="age-range"
                                    value={ageRange}
                                    onChange={(e) => setAgeRange(e.target.value)}
                                />
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
                                <Label htmlFor="course">Course name</Label>
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
                                <Label htmlFor="education-level">School</Label>
                                <Select
                                    disabled
                                    value={schoolChoice}
                                    onValueChange={(value) => setSchoolChoice(value)}
                                >
                                    <SelectTrigger className="w-full max-w">
                                        <SelectValue placeholder="Select School" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.isArray(schools) && schools.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="education-level">University</Label>
                                <Select
                                    disabled
                                    value={universityChoice}
                                    onValueChange={(value) => setUniversityChoice(value)}
                                >
                                    <SelectTrigger className="w-full max-w">
                                        <SelectValue placeholder="Select University" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.isArray(universities) && universities.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>


                            <Button onClick={handleAddStudent}>Create</Button>
                        </DialogContent>
                    </Dialog>
                </div>
                {status === "loading" && <p className="text-gray-500 mt-2">Loading schools...</p>}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            {/* <TableHead>Age Range</TableHead> */}
                            <TableHead>Gender</TableHead>
                            <TableHead>Disabled</TableHead>
                            <TableHead>Education Level</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(students) &&
                            students.map((student, index) => (
                                <TableRow key={student.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{student.first_name + ' ' + student.last_name}</TableCell>
                                    <TableCell>{student.age}</TableCell>
                                    {/* <TableCell>{school.region.name}</TableCell> */}
                                    <TableCell>{student.gender.name}</TableCell>
                                    <TableCell>{student.disability ? "Yes" : "No"}</TableCell>
                                    <TableCell>{student.education_level.name}</TableCell>
                                    <TableCell>{student.phone}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{dayjs(student.created_at).format("dddd, MMMM D, YYYY h:mm A")}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Pencil
                                                onClick={() => handleEditStudent(student)}
                                                size={17}
                                                className="cursor-pointer text-black-600"
                                            />
                                            <Trash2
                                                onClick={() => handleDeleteClick(student)}
                                                size={17}
                                                className="cursor-pointer text-black-600"
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

                {/* Edit Student Dialog */}
                <Dialog open={isEditStudentOpen} onOpenChange={(open) => {
                    setIsEditStudentOpen(open);
                    if (!open) {
                        resetForm();
                        setEditingStudent(null);
                    }
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Student Information</DialogTitle>
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
                            <Label htmlFor="edit-age-range">Age range</Label>
                            <Input type="text" id="edit-age-range"
                                value={ageRange}
                                onChange={(e) => setAgeRange(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-education-level">Educational Level</Label>
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
                            <Label htmlFor="edit-course">Course name</Label>
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
                            <Label htmlFor="edit-school">School</Label>
                            <Select
                                disabled
                                value={schoolChoice}
                                onValueChange={(value) => setSchoolChoice(value)}
                            >
                                <SelectTrigger className="w-full max-w">
                                    <SelectValue placeholder="Select School" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.isArray(schools) && schools.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-university">University</Label>
                            <Select
                                disabled
                                value={universityChoice}
                                onValueChange={(value) => setUniversityChoice(value)}
                            >
                                <SelectTrigger className="w-full max-w">
                                    <SelectValue placeholder="Select University" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.isArray(universities) && universities.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button onClick={handleUpdateStudent}>Update</Button>
                    </DialogContent>
                </Dialog>

                {/* Delete Student Dialog */}
                <Dialog open={isDeleteStudentOpen} onOpenChange={setIsDeleteStudentOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete School Information</DialogTitle>
                            <h3>This action will permanently erase <b>{firstName + ' ' + middleName + ' ' + lastName}</b> from the database</h3>
                        </DialogHeader>
                        <Button variant="destructive" onClick={handleDeleteStudent}>Delete</Button>
                    </DialogContent>
                </Dialog>









            </div>
        </div>
    );
}
export default SchoolDetails