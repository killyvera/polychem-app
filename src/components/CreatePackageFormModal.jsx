import {
    Box, Button, Divider, InputLabel, Modal, TextField
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import { useCallback } from "react";
import FlexView from "react-flexview";


export const CreatePackageFormModal = ({ isPackageModalVisible, setIsPackageModalVisible }) => {

    // const [ isPackageModalVisible , setIsPackageModalVisible ] = useState(false);

    const style = {
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70%",
        bgcolor: "white",
        borderRadius: "5px",
        pt: 2,
        px: 4,
        pb: 3,
    };

    const padding = {
        padding: '5px'
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            pallets: ['Pallet 1', 'Pallet 2', 'Pallet 3'],
        },
        onSubmit: (values) => {

        },
    });

    const handleCreatePackage = useCallback(() => {
        // add created package data into context //
    }, [])



    return (
        <Modal
            open={isPackageModalVisible}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style }}>
                <h2 id="parent-modal-title">Package Form</h2>
                <Divider />
                <FlexView column hAlignContent="center" marginTop={"10%"}>
                    <Card style={{ width: "60%" }}>
                        <form onSubmit={formik.handleSubmit}>
                            <CardContent>
                                <FlexView column style={{ margin: "10px" }}>
                                    <TextField
                                        error={Boolean(formik.touched.name && formik.errors.name)}
                                        fullWidth
                                        helperText={formik.touched.name && formik.errors.name}
                                        label="Name"
                                        name="name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        required
                                        value={formik.values.name}
                                        variant="outlined"
                                    />
                                </FlexView>
                                <FlexView column style={{ margin: "10px" }}>
                                    {" "}
                                    <TextField
                                        error={Boolean(
                                            formik.touched.code && formik.errors.code
                                        )}
                                        fullWidth
                                        helperText={
                                            formik.touched.code && formik.errors.code
                                        }
                                        label="code"
                                        name="code"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        required
                                        value={formik.values.code}
                                        variant="outlined"
                                    />
                                </FlexView>

                                <FlexView column style={{ margin: "10px" }}>
                                    <FormControl fullWidth style={padding}>
                                        <InputLabel>Pallet List</InputLabel>
                                        <Select
                                            style={padding}
                                            error={Boolean(formik.touched.pallet && formik.errors.pallet)}
                                            fullWidth
                                            label="pallets"
                                            type="select"
                                            name="pallet"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.pallet}
                                            variant="outlined"
                                        >
                                            {formik.values.pallets?.map((pallet, index) => (
                                                <MenuItem value={pallet} key={index}>
                                                    {pallet}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </FlexView>
                            </CardContent>
                            <FlexView hAlignContent="right">
                                {" "}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: "5px" }}
                                // onClick={saveFormulaElement}
                                >
                                    Create Package
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: "5px" }}
                                // onClick={handleAddFormulaElement}
                                >
                                    Add
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    style={{ margin: "5px" }}
                                    onClick={formik.resetForm}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    style={{ margin: "5px" }}
                                    onClick={() => (setIsPackageModalVisible(false))}
                                >
                                    Cancel
                                </Button>
                            </FlexView>
                        </form>
                    </Card>
                </FlexView>
            </Box>
        </Modal>
    );
};
