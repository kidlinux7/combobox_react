import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import donorReducer from './donorSlice';
import regionReducer from './regionSlice';
import institutionTypeReducer from './institutionTypeSlice';
import schoolReducer from './schoolSlice';
import genderReducer from './genderSlice';
import studentReducer from './studentSlice';
import teacherReducer from './teacherSlice';
import educationLevelReducer from './educationLevelSlice';
import universityReducer from './universitySlice';
import centerReducer from './centerSlice';
import volunteerReducer from './volunteerSlice';
import nationalityReducer from './nationalitySlice'
import ambassadorReducer from './ambassadorSlice'



const store = configureStore({
  reducer: {
    project: projectReducer,
    donor: donorReducer,
    school: schoolReducer,
    region: regionReducer,
    institutionType: institutionTypeReducer,
    gender: genderReducer,
    student: studentReducer,
    teacher: teacherReducer,
    educationLevel: educationLevelReducer,
    university: universityReducer,
    center: centerReducer,
    volunteer: volunteerReducer,
    nationality: nationalityReducer,
    ambassador:ambassadorReducer
  },
});

export default store;
