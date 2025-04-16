import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDonors, deleteDonors, fetchDonors, updateDonors } from "../redux/donorSlice";
import { Plus, Trash2, Pencil } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Donors = () => {
    const dispatch = useDispatch();
    const { donors, status } = useSelector((state) => state.donor);

    const [editingDonor, setEditingDonor] = useState(null); // Track the donor you're editing
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [totalFunds, setTotalFunds] = useState(0);

    useEffect(() => {
        dispatch(fetchDonors());
    }, [dispatch]);

    const handleAddDonor = () => {
        if (!name.trim()) return;
        dispatch(addDonors({ name: name, website: website, total_funds_collected: totalFunds }))
            .unwrap()
            .then(() => {
                setName("");
                setWebsite("");
                setTotalFunds(0);
                dispatch(fetchDonors());
            });
    };

    const handleEditDonor = (donor) => {
        setEditingDonor(donor); // Set the donor you're editing
        setID(donor.id);
        setName(donor.name);
        setWebsite(donor.website);
        setTotalFunds(donor.total_funds_collected);
    };

    const handleUpdateDonor = () => {
        dispatch(updateDonors({ id: id, name: name, website: website, total_funds_collected: totalFunds }))
            .unwrap()
            .then(() => {
                setID(0);
                setName("");
                setWebsite("");
                setTotalFunds(0);
                dispatch(fetchDonors());
            });
        console.log("Update donor:", { name, website, totalFunds });
        setEditingDonor(null); // Close the dialog after updating
    };

    const handleDeleteDonor = () => {
        dispatch(deleteDonors({ id: id }))
        .unwrap()
        .then(() => {
            setID(0);
            setName("");
            setWebsite("");
            setTotalFunds(0);
            dispatch(fetchDonors());
        });
        setEditingDonor(null); // Close the dialog after updating
    };

    return (
        <div className="p-1">
            <div className="mt-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{donors.length} Donors</h2>

                    {/* Create Donor */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus size={18} />
                                New Donor
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Donor</DialogTitle>
                            </DialogHeader>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="website">Website</Label>
                                <Input type="text" id="website"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </div>

                            <div className="grid w-full max-w items-center gap-1.5">
                                <Label htmlFor="funds">Total Funds Contributed (TZS)</Label>
                                <Input type="number" id="funds"
                                    value={totalFunds}
                                    onChange={(e) => setTotalFunds(e.target.value)}
                                />
                            </div>

                            <Button onClick={handleAddDonor}>Create</Button>
                        </DialogContent>
                    </Dialog>
                </div>

                {status === "loading" && <p className="text-gray-500 mt-2">Loading donors...</p>}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Website</TableHead>
                            <TableHead>Total Funds Collected (TZS)</TableHead>
                            <TableHead>Projects</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.isArray(donors) &&
                            donors.map((donor, index) => (
                                <TableRow key={donor.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{donor.name}</TableCell>
                                    <TableCell>{donor.website}</TableCell>
                                    <TableCell>{donor.total_funds_collected}</TableCell>
                                    <TableCell>5</TableCell> {/* Placeholder for projects */}
                                    <TableCell>{dayjs(donor.created_at).format("dddd, MMMM D, YYYY h:mm A")}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Dialog>
                                                <DialogTrigger>
                                                    <Pencil
                                                        onClick={() => handleEditDonor(donor)} // Correctly pass a function
                                                        size={17}
                                                        className="cursor-pointer text-black-600"
                                                    />
                                                </DialogTrigger>
                                                {/* Edit Dialog */}
                                                <DialogContent open={editingDonor !== null} onClose={() => setEditingDonor(null)}>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Donor Information</DialogTitle>
                                                    </DialogHeader>

                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input
                                                            type="text"
                                                            id="name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="website">Website</Label>
                                                        <Input
                                                            type="text"
                                                            id="website"
                                                            value={website}
                                                            onChange={(e) => setWebsite(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="grid w-full max-w items-center gap-1.5">
                                                        <Label htmlFor="funds">Total Funds Contributed (TZS)</Label>
                                                        <Input
                                                            type="number"
                                                            id="funds"
                                                            value={totalFunds}
                                                            onChange={(e) => setTotalFunds(e.target.value)}
                                                        />
                                                    </div>

                                                    <Button onClick={handleUpdateDonor}>Update</Button>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog>
                                                <DialogTrigger>
                                                    <Trash2
                                                        onClick={() => handleEditDonor(donor)} // Correctly pass a function
                                                        size={17}
                                                        className="cursor-pointer text-black-600"
                                                    />
                                                </DialogTrigger>

                                                {/* Delete Dialog */}
                                                <DialogContent onClose={() => setEditingDonor(null)}>
                                                    <DialogHeader>
                                                        <DialogTitle>Delete Donor Information</DialogTitle>
                                                        <h3>This action will permanently erase <b>{name}</b> from the database</h3>
                                                    </DialogHeader>
                                                    <Button variant="destructive" onClick={handleDeleteDonor}>Delete</Button>
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
};

export default Donors;
