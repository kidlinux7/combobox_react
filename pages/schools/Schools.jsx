import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSchool, deleteSchool, fetchSchools, updateSchool } from "../../redux/schoolSlice";
import { fetchInstitutionTypes } from "../../redux/institutionTypeSlice";
import { fetchRegions } from "../../redux/regionSlice";

import { Plus, Trash2, Pencil, Eye, ArrowRight } from "lucide-react";
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

const Schools = () => {
    const dispatch = useDispatch();
    const { schools, status } = useSelector((state) => state.school);
    const { regions } = useSelector((state) => state.region);
    const { institutionTypes } = useSelector((state) => state.institutionType);

    const [editingSchool, setEditingSchool] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [institutionType, setInstitutionType] = useState("");
    const [region, setRegion] = useState("");
    const [toilets, setToilets] = useState("");
    const [libraries, setLibraries] = useState("");
    const [computers, setComputers] = useState("");
    const [water_reserves, setWaterReserves] = useState("");

    useEffect(() => {
        dispatch(fetchSchools());
        dispatch(fetchRegions());
        dispatch(fetchInstitutionTypes());
    }, [dispatch]);

    const resetForm = () => {
        setID(0);
        setName("");
        setInstitutionType("");
        setRegion("");
        setToilets("");
        setLibraries("");
        setComputers("");
        setWaterReserves("");
    };

    const handleAddSchool = () => {
        if (!name.trim() || !institutionType || !region) {
            alert("Please fill in all required fields");
            return;
        }

        dispatch(addSchool({ 
            name: name, 
            type_id: Number(institutionType), 
            region_id: Number(region), 
            toilets: Number(toilets) || 0, 
            computers: Number(computers) || 0, 
            libraries: Number(libraries) || 0, 
            water_reserves: Number(water_reserves) || 0 
        }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsCreateOpen(false);
                dispatch(fetchSchools());
            })
            .catch((error) => {
                console.error("Failed to add school:", error);
            });
    };

    const handleEditSchool = (school) => {
        setEditingSchool(school);
        setID(school.id);
        setName(school.name);
        setInstitutionType(school.type?.id?.toString() || "");
        setRegion(school.region?.id?.toString() || "");
        setToilets(school.toilets?.toString() || "");
        setLibraries(school.libraries?.toString() || "");
        setComputers(school.computers?.toString() || "");
        setWaterReserves(school.water_reserves?.toString() || "");
        setIsEditOpen(true);
    };

    const handleUpdateSchool = () => {
        if (!name.trim() || !institutionType || !region) {
            alert("Please fill in all required fields");
            return;
        }

        dispatch(updateSchool({ 
            id: id,
            name: name, 
            type_id: Number(institutionType), 
            region_id: Number(region), 
            toilets: Number(toilets) || 0, 
            computers: Number(computers) || 0, 
            libraries: Number(libraries) || 0, 
            water_reserves: Number(water_reserves) || 0 
        }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsEditOpen(false);
                setEditingSchool(null);
                dispatch(fetchSchools());
            })
            .catch((error) => {
                console.error("Failed to update school:", error);
            });
    };

    const handleDeleteSchool = () => {
        dispatch(deleteSchool({ id: id }))
            .unwrap()
            .then(() => {
                resetForm();
                setIsDeleteOpen(false);
                setEditingSchool(null);
                dispatch(fetchSchools());
            })
            .catch((error) => {
                console.error("Failed to delete school:", error);
            });
    };

    const handleDeleteClick = (school) => {
        setEditingSchool(school);
        setID(school.id);
        setName(school.name);
        setIsDeleteOpen(true);
    };

    return (
        <div className="p-1">
            <div className="mt-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                        {schools.length} {schools.length === 1 ? 'School' : 'Schools'}
                    </h2>
                    
                    {/* Create School Dialog */}
                    <Dialog open={isCreateOpen} onOpenChange={(open) => {
                        setIsCreateOpen(open);
                        if (open) {
                            resetForm(); // Reset form when opening create dialog
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus size={18} />
                                New School
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New School</DialogTitle>
                            </DialogHeader>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="create-name">Name</Label>
                                <Input 
                                    type="text" 
                                    id="create-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="create-type">Type</Label>
                                <Select 
                                    value={institutionType} 
                                    onValueChange={(value) => setInstitutionType(value)}
                                >
                                    <SelectTrigger className="w-full max-w">
                                        <SelectValue placeholder="Select an Institution Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.isArray(institutionTypes) && institutionTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.id.toString()}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="create-region">Region</Label>
                                <Select 
                                    value={region} 
                                    onValueChange={(value) => setRegion(value)}
                                >
                                    <SelectTrigger className="w-full max-w">
                                        <SelectValue placeholder="Select a Region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {Array.isArray(regions) && regions.map((reg) => (
                                                <SelectItem key={reg.id} value={reg.id.toString()}>
                                                    {reg.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="create-toilets">Toilets</Label>
                                <Input 
                                    type="number" 
                                    id="create-toilets"
                                    value={toilets}
                                    onChange={(e) => setToilets(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="create-computers">Computers</Label>
                                <Input 
                                    type="number" 
                                    id="create-computers"
                                    value={computers}
                                    onChange={(e) => setComputers(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="create-libraries">Libraries</Label>
                                <Input 
                                    type="number" 
                                    id="create-libraries"
                                    value={libraries}
                                    onChange={(e) => setLibraries(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="create-water">Water Reserves</Label>
                                <Input 
                                    type="number" 
                                    id="create-water"
                                    value={water_reserves}
                                    onChange={(e) => setWaterReserves(e.target.value)}
                                />
                            </div>

                            <Button onClick={handleAddSchool}>Create</Button>
                        </DialogContent>
                    </Dialog>
                </div>

                {status === "loading" && <p className="text-gray-500 mt-2">Loading schools...</p>}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Computers</TableHead>
                            <TableHead>Libraries</TableHead>
                            <TableHead>Water Reserves</TableHead>
                            <TableHead>Toilets</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(schools) && schools.map((school, index) => (
                            <TableRow key={school.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{school.name}</TableCell>
                                <TableCell>{school.type?.name || 'N/A'}</TableCell>
                                <TableCell>{school.region?.name || 'N/A'}</TableCell>
                                <TableCell>{school.computers}</TableCell>
                                <TableCell>{school.libraries}</TableCell>
                                <TableCell>{school.water_reserves}</TableCell>
                                <TableCell>{school.toilets}</TableCell>
                                <TableCell>{dayjs(school.created_at).format("dddd, MMMM D, YYYY h:mm A")}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Pencil
                                            onClick={() => handleEditSchool(school)}
                                            size={17}
                                            className="cursor-pointer text-black-600 hover:text-blue-600"
                                        />
                                        <Trash2
                                            onClick={() => handleDeleteClick(school)}
                                            size={17}
                                            className="cursor-pointer text-black-600 hover:text-red-600"
                                        />
                                        <Link to={`/schools/${school.name}`} state={{ school }}>
                                            <ArrowRight
                                                size={17}
                                                className="cursor-pointer text-black-600 hover:text-green-600"
                                            />
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={(open) => {
                    setIsEditOpen(open);
                    if (!open) {
                        resetForm(); // Reset form when closing edit dialog
                        setEditingSchool(null);
                    }
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit School Information</DialogTitle>
                        </DialogHeader>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input 
                                type="text" 
                                id="edit-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-type">Type</Label>
                            <Select 
                                value={institutionType} 
                                onValueChange={(value) => setInstitutionType(value)}
                            >
                                <SelectTrigger className="w-full max-w">
                                    <SelectValue placeholder="Select an Institution Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.isArray(institutionTypes) && institutionTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-region">Region</Label>
                            <Select 
                                value={region} 
                                onValueChange={(value) => setRegion(value)}
                            >
                                <SelectTrigger className="w-full max-w">
                                    <SelectValue placeholder="Select a Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Array.isArray(regions) && regions.map((reg) => (
                                            <SelectItem key={reg.id} value={reg.id.toString()}>
                                                {reg.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-toilets">Toilets</Label>
                            <Input 
                                type="number" 
                                id="edit-toilets"
                                value={toilets}
                                onChange={(e) => setToilets(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-computers">Computers</Label>
                            <Input 
                                type="number" 
                                id="edit-computers"
                                value={computers}
                                onChange={(e) => setComputers(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-libraries">Libraries</Label>
                            <Input 
                                type="number" 
                                id="edit-libraries"
                                value={libraries}
                                onChange={(e) => setLibraries(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w items-center gap-1.5">
                            <Label htmlFor="edit-water">Water Reserves</Label>
                            <Input 
                                type="number" 
                                id="edit-water"
                                value={water_reserves}
                                onChange={(e) => setWaterReserves(e.target.value)}
                            />
                        </div>

                        <Button onClick={handleUpdateSchool}>Update</Button>
                    </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog open={isDeleteOpen} onOpenChange={(open) => {
                    setIsDeleteOpen(open);
                    if (!open) {
                        resetForm(); // Reset form when closing delete dialog
                        setEditingSchool(null);
                    }
                }}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete School Information</DialogTitle>
                            <h3 className="text-sm text-gray-600 mt-2">
                                This action will permanently erase <b>{name}</b> from the database
                            </h3>
                        </DialogHeader>
                        <Button variant="destructive" onClick={handleDeleteSchool}>Delete</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Schools;