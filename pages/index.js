import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

import Script from 'next/script';
import Design from './components/Design';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [positions, setPositions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/alljobs');
        const data = await response.json();
        if (data && data.length > 0) {
          const categoriesList = [...new Set(data.map(job => job.category))];
          const positionsList = [...new Set(data.map(job => job.position))];
          const locationsList = [...new Set(data.map(job => job.location))];
          setCategories(categoriesList);
          setPositions(positionsList);
          setLocations(locationsList);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/alljobs/search?category=${selectedCategory}&position=${selectedPosition}&location=${selectedLocation}`);
      const data = await response.json();
      setJobDetails(data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const handleSearch = () => {
    if (selectedCategory && selectedPosition && selectedLocation) {
      fetchJobDetails();
    } else {
      console.log('Please select all options');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Karigori</title>
        <meta
          name="karigori - a beginner friendly career-counseling platform"
          content="a unique job searching platform"
        />
        <link rel="icon" href="/favicon.ico" />

      </Head>


      <div className={styles.main}>

        <div className={styles.jobSearchBox}>
          <h2><span className={styles.highlight}>Job </span>Search</h2>

		  <div className={styles.dropDown}>
		  <div className={styles.selectContainer}>
            <label className={styles.label}>Job Category </label>
            <select
              className={styles.select}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectContainer}>
            <label className={styles.label}>Job Position</label>
            <select
              className={styles.select}
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="">Choose Position</option>
              {positions.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.selectContainer}>
            <label className={styles.label}>Job Location</label>
            <select
              className={styles.select}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Choose Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
		  </div>
 

          <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
        </div>
		<Design />
        {/* Display job details */}
        <div className={styles.jobSection}>
		<div>
            {jobDetails.length > 0 ? (
              jobDetails.map((job, index) => (
                <div key={index} className={styles.jobDetails}>
                  <h3>{job.position}</h3>
                  <p> Location : {job.location} 📌</p>
				  <h3>Requirements 📑</h3>
                 <span className={styles.skillBoxContainer}>
				 
				 {job.requirements.map((requirement, reqIndex) => (
            <div className={styles.skillBox}><p key={reqIndex}>{requirement}</p> </div>
          ))}
				
				 
				 </span> 
                  <button className={styles.searchBtn}>Apply ➤</button>
                  <button className={styles.searchBtn}>Learn ➤</button>

                </div>
              ))
            ) : (
              <div className={styles.error}><p>No job details available</p></div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}