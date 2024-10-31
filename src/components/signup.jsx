import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    homeAddress: '',
    workAddress: '',
    phoneNumber: '',
    nationalId: '',
    occupation: '',
    ageRange: '',
    idUpload: null,
    normalDayDescription: '',
    helpAreas: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [areaInput, setAreaInput] = useState(''); // For the input field to add help areas

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAddArea = () => {
    if (areaInput && !formData.helpAreas.includes(areaInput)) {
      setFormData((prevData) => ({
        ...prevData,
        helpAreas: [...prevData.helpAreas, areaInput],
      }));
      setAreaInput(''); // Clear the input after adding
    }
  };

  const handleRemoveArea = (area) => {
    setFormData((prevData) => ({
      ...prevData,
      helpAreas: prevData.helpAreas.filter((item) => item !== area),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-10 shadow-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        {isSubmitted ? (
          <div className="text-center text-green-600 font-semibold">
            Thank you! Your registration was successful.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-5 text-black">Register Here</h2>
            <h4 className='text-center text-gray-500 mb-10'>This is the beginning of a simplified day...</h4>

            {/* Two-column layout for form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none"
                required
              />
              <input
                type="text"
                name="homeAddress"
                placeholder="Home Address"
                value={formData.homeAddress}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none"
                required
              />
              <input
                type="text"
                name="workAddress"
                placeholder="Work Address"
                value={formData.workAddress}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none"
                required
              />
              <input
                type="text"
                name="nationalId"
                placeholder="National ID Number"
                value={formData.nationalId}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none"
                required
              />
              <input
                type="file"
                name="idUpload"
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none col-span-2" // Span across both columns
                required
              />
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none"
              />
              <select
                name="ageRange"
                value={formData.ageRange}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none col-span-2" // Span across both columns
                required
              >
                <option value="">Select Age Range</option>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55+">55+</option>
              </select>
            </div>

            <label className="mt-4 block text-gray-600 font-medium">Describe your normal day:</label>
            <textarea
              name="normalDayDescription"
              value={formData.normalDayDescription}
              onChange={handleChange}
              className="mt-4 p-2 w-full border rounded-md focus:outline-none"
              rows="4"
              required
              placeholder="Describe how your normal day looks like..."
            />

            <label className="mt-4 block text-gray-600 font-medium">Areas where you need help:</label>
            <div className="mt-2 flex items-center">
              <input
                type="text"
                value={areaInput}
                onChange={(e) => setAreaInput(e.target.value)}
                placeholder="Type an area (eg. laundry) and click 'Add'"
                className="p-2 w-full border rounded-md focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddArea}
                className="ml-2 bg-[green] text-white p-2 rounded-md hover:bg-[green]/70"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-2">
              {formData.helpAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-700 p-2 m-1 rounded-full flex items-center"
                >
                  <span>{area}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveArea(area)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-[#166534] text-white p-2 rounded-md hover:bg-green-600"
            >
              Register
            </button>
            <div>
              <p className='text-center text-black'>
                Have an account already? <Link to='/login' className='text-[#BE9835]'>Login</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
