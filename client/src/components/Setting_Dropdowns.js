import React, { useContext, useEffect, useState } from 'react'
import '../styles/setting_dropdown.css'
import { SettingsContext } from '../context'
import { updateDropdownsData } from '../utils';
import toast from 'react-hot-toast';
import { LoadingGear } from '../assets/svg';

function Setting_Dropdowns() {
    const {
        dropdowns,
        setDropdowns
    } = useContext(SettingsContext)
    const [isLoading, setIsLoading] = useState(false)

    const handleDropdownChange = (e, index) => {
        const newValue = e.target.value.split('\n').join(', ');
        const updatedDropdowns = dropdowns.map((dropdown, i) => {
            if (i === index) {
                return { ...dropdown, dropdown_option: newValue };
            }
            return dropdown;
        });
        setDropdowns(updatedDropdowns);
    };

    const handleDropdownBlur = (e, index) => {
        const updatedDropdowns = dropdowns.map((dropdown, i) => {
            if (i === index) {
                const options = dropdown.dropdown_option.split('\n')
                    .map(option => option.trim())
                    .filter(option => option.length > 0);
    
                // Join the options with commas and spaces, but only add a comma and space if it's not the last option
                const processedOptions = options.map((option, idx, arr) => {
                    return idx < arr.length - 1 ? option + ', ' : option;
                });
    
                return { ...dropdown, dropdown_option: processedOptions.join('') };
            }
            return dropdown;
        });
        setDropdowns(updatedDropdowns);
    };

    const handleDropdownSave = async() => {
        setIsLoading(true)
        const res = await updateDropdownsData({ dropdowns: dropdowns })

        if(res?.status === 200){
            setIsLoading(false)
            toast.success('Dropdowns saved.')
        }
        else if(res?.status === 400){
            setIsLoading(false)
            toast.error('An error Occured while saving the dropdowns.')
        }
    }

    return (
        <section id='Setting_Dropdown' className='Setting_Dropdown'>
            <div className="wrapper">
                <div className="Dropdown_Top">
                    <button className="Dropdown_Save" onClick={() => handleDropdownSave()}>
                        {isLoading ? (<LoadingGear width='40px' height='40px'/>) : "Save"}
                    </button>
                </div>
                <div className="Dropdown_List">
                    {dropdowns && dropdowns.map((dropdown, index) => (
                        <div className="Dropdown" key={dropdown.dropdown_id}>
                            <div className="Dropdown_Label">
                                <p>{dropdown.option_For}</p>
                            </div>
                            <div className="Dropdown_Input">
                                <textarea 
                                    rows="15"
                                    spellCheck="false"   
                                    autoCorrect="off" 
                                    autoCapitalize="none"
                                    maxLength={16500}
                                    placeholder='Input dropdown options...' 
                                    value={dropdown.dropdown_option.split(', ').join('\n')}
                                    onChange={(e) => handleDropdownChange(e, index)}
                                    onBlur={(e) => handleDropdownBlur(e, index)}
                                />
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </section>
    )
}

export default Setting_Dropdowns