// src/components/LoyaltyForm.jsx
import { useState, useEffect, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Snackbar, Alert, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField, Select, MenuItem, Button,
  Grid, FormControl, InputLabel
} from '@mui/material';
import { Country, State } from 'country-state-city';
import { ThemeContext } from '../context/ThemeContext';
import LoyalMembers from './LoyalMembers';

const cityToPincode = {
  'New York': '10001',
  'London': 'SW1A',
  'Paris': '75000',
  'Tokyo': '100-0001',
  'Mumbai': '400001'
};

export default function LoyaltyForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      phoneCode: '',
      genderType: '',
      country: '',
      region: '',
      membershipType: ''
    }
  });

  const [regions, setRegions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showMembers, setShowMembers] = useState(false);

  const countries = Country.getAllCountries();
  const membershipTypes = ['Basic', 'Silver', 'Gold', 'Platinum'];
  const genderTypes = ['Male', 'Female'];
  const watchCountry = watch('country');
  const watchCity = watch('city');
  const theme = useTheme();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleTitleClick = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const formattedCity = watchCity?.trim();
    if (formattedCity) {
      const matchedCity = Object.keys(cityToPincode).find(
        key => key.toLowerCase() === formattedCity.toLowerCase()
      );

      if (matchedCity) {
        setValue('city', matchedCity, { shouldValidate: true });
        setValue('PinCode', cityToPincode[matchedCity], { shouldValidate: true });
      }
    }
  }, [watchCity, setValue]);

  useEffect(() => {
    if (watchCountry) {
      const countryObj = countries.find(c => c.name === watchCountry);
      if (countryObj) {
        setSelectedCountry(countryObj.isoCode);
        setRegions(State.getStatesOfCountry(countryObj.isoCode));
      }
    } else {
      setRegions([]);
    }
  }, [watchCountry]);

  const onSubmit = data => {
    const submissionId = `LY-${Date.now()}`;
    const submissions = JSON.parse(sessionStorage.getItem('loyaltySubmissions') || '[]');
    submissions.push({ id: submissionId, ...data });
    sessionStorage.setItem('loyaltySubmissions', JSON.stringify(submissions));

    setSnackbarMessage(`Your loyalty membership created with ID ${submissionId}`);
    setOpenSnackbar(true);
    handleClear();
  };

  const handleClear = () => {
    reset({
      firstName: '',
      lastName: '',
      phoneCode: '',
      phone: '',
      genderType: '',
      country: '',
      region: '',
      address: '',
      city: '',
      PinCode: '',
      membershipType: ''
    });
    setRegions([]);
    setSelectedCountry('');
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .no-select {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (showMembers) {
    return <LoyalMembers setShowMembers={setShowMembers} handleClear={handleClear} />;
  }


  return (
    <Box
      sx={{
        p: 4,
        borderRadius: '6rem',
        backgroundColor: 'background.paper',
        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 193, 7, 0.3)'}`,
        boxShadow: darkMode
          ? `0 0 50px ${theme.palette.primary.main}, 
             0 0 50px rgba(0, 0, 0, 0.3)`
          : `0 0 50px ${theme.palette.warning.light}, 
             0 0 50px rgba(255, 193, 7, 0.2)`,
        transition: 'all 0.3s ease',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 4,
                py: 2,
                textTransform: 'uppercase',
                letterSpacing: 4,
                fontSize: {
                  xs: '1.75rem',
                  sm: '2rem',
                  md: '2.5rem'
                },
              }}
            >
              <Box
                component="span"
                onClick={handleTitleClick}
                sx={{
                  color: darkMode ? 'primary.light' : 'warning.main',
                  cursor: 'pointer',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  display: 'inline-block',
                  transition: 'color 0.3s ease-in-out',

                  '&:hover': {
                    color: darkMode ? 'warning.main' : 'primary.light',
                  },
                }}
                className="no-select"
              >
                Create Loyalty
              </Box>
            </Typography>
          </Grid>


           {/* First Name */}
           <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              {...register("firstName", {
                required: "Required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets allowed"
                }
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          {/* Last Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              {...register("lastName", {
                required: "Required",
                pattern: {
                  value: /^[A-Za-z]+$/,
                  message: "Only alphabets allowed"
                }
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>


          {/* Phone Code */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" gap={2}>
              <FormControl sx={{ width: '30%' }} error={!!errors.phoneCode}>
                <InputLabel>Code</InputLabel>
                <Controller
                  name="phoneCode"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Code"
                    >
                      {countries.map(country => (
                        <MenuItem key={country.isoCode} value={country.phonecode}>
                          {`${country.phonecode} (${country.isoCode})`}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              {/* Phone Number */}
              <TextField
                fullWidth
                label="Phone Number"
                type="tel"
                {...register("phone", {
                  required: "Required",
                  pattern: {
                    value: /^[0-9]{8,15}$/,
                    message: "8-15 digit number required"
                  }
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                sx={{ width: '70%' }}
              />
            </Box>
          </Grid>

          {/* Gender */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.genderType}>
              <InputLabel>Gender</InputLabel>
              <Controller
                name="genderType"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Gender"
                  >
                    {genderTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Country */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.country}>
              <InputLabel>Country</InputLabel>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Country"
                    onChange={(e) => {
                      field.onChange(e);
                      setSelectedCountry('');
                      setRegions([]);
                    }}
                  >
                    {countries.map(country => (
                      <MenuItem key={country.isoCode} value={country.name}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Region/State */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.region}>
              <InputLabel>Region</InputLabel>
              <Controller
                name="region"
                control={control}
                rules={{ required: regions.length > 0 && "Region is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Region"
                    disabled={!regions.length}
                  >
                    {regions.map(region => (
                      <MenuItem key={region.isoCode} value={region.name}>
                        {region.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              {...register("address", {
                required: "Required",
                pattern: {
                  value: /^[a-zA-Z0-9\s,-]+$/,
                  message: "Only alphanumerics, spaces, commas, and hyphens allowed"
                }
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>

          {/* City & Pincode */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" gap={2}>
              <TextField
                fullWidth
                label="City"
                {...register("city", {
                  required: "Required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only alphabets allowed"
                  }
                })}
                error={!!errors.city}
                helperText={errors.city?.message}
                sx={{ width: '60%' }}
              />
              <TextField
                fullWidth
                label="Pin Code"
                {...register("PinCode", {
                  required: "Required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers allowed"
                  }
                })}
                error={!!errors.PinCode}
                helperText={errors.PinCode?.message}
                sx={{ width: '40%' }}
                InputProps={{
                  readOnly: !!cityToPincode[watchCity?.trim()]
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.membershipType}>
              <InputLabel>Membership Type</InputLabel>
              <Controller
                name="membershipType"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Membership Type"
                  >
                    {membershipTypes.map(type => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-start">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={handleClear}
                sx={{ ml: 2 }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => setShowMembers(true)}
                sx={{ ml: 2 }}
              >
                Loyal Members
              </Button>
            </Box>
          </Grid>
        </Grid>
{/* Snackbar */}
<Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </form>
    </Box>
  );
}