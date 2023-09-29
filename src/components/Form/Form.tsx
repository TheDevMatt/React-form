import React, {useState, useEffect} from 'react';
import {FormControl, InputLabel, Input, Button, Select, MenuItem, Typography, Container} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import '../../styles/Form.css';

interface FormData{
    continent: string;
    name:string;
    surname:string;
    birthDate: Date | null;
}

const Form = () => {
    const [data, setData] = useState<FormData>({
        continent: '',
        name: '',
        surname: '',
        birthDate: null,
    })

    const [continentSurnameValidation, setContinentSurnameValidation] = useState<string | null>(null);
    const [nameValidation, setNameValidation] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

    function calculateAge(dateBirth: Date | null): number | null {
        if(!dateBirth){
            return null;
        }

        const currentDate = new Date();
        const birthDateObj = new Date(dateBirth);
        const age = currentDate.getFullYear() - birthDateObj.getFullYear();

        return age;
    } 

    useEffect(() => {
        const age = calculateAge(data.birthDate);
        if(data.birthDate !== null &&  age !== null){
        setIsButtonActive(data.birthDate > new Date());

        if(age > 60){
            document.body.style.fontSize = '2rem';
        }else{
            document.body.style.fontSize = '1rem';
        }
        }
    }, [data.birthDate])

    const handleContinentChange = (e: React.ChangeEvent<{ value: any }>) => {
        const { value } = e.target;
    
        setData((prevData) => ({
          ...prevData,
          continent: value as string,
        }));
      };

    const handleNameChange = (e:React.ChangeEvent<{ value: string }>) => {
        const {value} = e.target;

        setData((prevData) => ({
            ...prevData,
            name: value as string
        }))
    };

    const handleSurnameChange = (e: React.ChangeEvent<{ value: string }>) => {
        const {value} = e.target;

        setData((prevData) => ({
            ...prevData,
            surname: value as string,
        }))
    };

    const handleDateChange = (date:Date | null) => {
       setData({...data, birthDate: date});
    }

    const handleSubmitForm = (e: React.ChangeEvent) => {
        e.preventDefault();

        if(data.continent === 'Europa' && data.surname.length < 2){
            setContinentSurnameValidation("Nie spełnione kryteria");
            return;
        }
        if(data.name === ''){
            setNameValidation("To pole jest wymagane");
            return;
        }  

    setContinentSurnameValidation(null);
    setNameValidation(null);
    document.body.style.fontSize = '1rem';
    setSuccess(true);

    setTimeout(() => {
        alert("Sukces");
    }, 0);

    setData({
        continent: '',
        name: '',
        surname: '',
        birthDate: null,
        });
    }
    return(
            <Container maxWidth="sm" className='form-container'>
            <h1>Formularz React</h1>
            <form onSubmit={handleSubmitForm as any}>
                <FormControl fullWidth>
                <InputLabel>Kontynent</InputLabel>
                <Select fullWidth variant='standard' name="Kontynent" value={data.continent} onChange={handleContinentChange as any} className='form-select'>
                    <MenuItem value="Afryka">Afryka</MenuItem>
                    <MenuItem value="Ameryka Południowa">Ameryka Południowa</MenuItem>
                    <MenuItem value="Ameryka Północna">Ameryka Północna</MenuItem>
                    <MenuItem value="Antarktyda">Antarktyda</MenuItem>
                    <MenuItem value="Australia">Australia</MenuItem>
                    <MenuItem value="Azja">Azja</MenuItem>
                    <MenuItem value="Europa">Europa</MenuItem>
                </Select>
                {continentSurnameValidation && (
                    <Typography variant="body2" color="error">{continentSurnameValidation}</Typography>
                )}
                </FormControl>
                <FormControl fullWidth className='form-input-name'>
                    <InputLabel>Imię</InputLabel>
                    <Input name="Imię" value={data.name} onChange={handleNameChange}/>
                {nameValidation && (
                    <Typography variant="body2" color="error">{nameValidation}</Typography>
                )}
                </FormControl>
                <FormControl fullWidth className='form-input-surname'>
                    <InputLabel>Nazwisko</InputLabel>
                    <Input name="Nazwisko" value={data.surname} onChange={handleSurnameChange}/>
                </FormControl>
                <DatePicker label="Data urodzenia" value={data.birthDate} onChange={handleDateChange} className='form-date'/>
                <Button type='submit' variant='contained' disabled={isButtonActive} className='form-button'>Wyślij</Button>
            </form>
            </Container>
    )
}

export default Form;